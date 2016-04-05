<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

use App\Nrb\NrbModel;
use App\User;

class Admin extends NrbModel
{
    use SoftDeletes;

    protected $table = 'admins';

    protected $dates = ['deleted_at'];

    protected $hidden = ['user_id','created_by','updated_by','created_at','updated_at','deleted_at'];

    protected $fillable = ['user_id', 'first_name', 'last_name', 'remarks', 'created_by', 'updated_by'];


    public static function boot()
    {
        parent::boot();

        static::created(function($admin){
            $user = $admin->user;
            $user->name = $admin->first_name.' '.$admin->last_name;
            $user->user_type = User::ADMIN;
            $user->activated_at = current_datetime();
            $user->save();
            return true;
        });

        static::deleting(function($admin){
            $admin->user->delete();
            return true;
        });

        static::updating(function($admin){
            User::find($admin->user_id)->update([
                'name' => $admin->first_name.' '.$admin->last_name
            ]);
        });
    }

    //---------- relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //---------- scopes

    //---------- helpers
}
