<?php
namespace App\Models;

use App\Nrb\NrbModel;

class Role extends NrbModel
{
    const SUPER_ADMIN   = 'super_admin';
    const ADMIN         = 'admin';

    protected $table = 'roles';

    protected $hidden = ['pivot'];

    /**
     * Boot the role model
     * Attach event listener to remove the many-to-many records when trying to delete
     * Will NOT delete any records if the role model uses soft deletes.
     *
     * @return void|bool
     */
    public static function boot()
    {
        parent::boot();

        static::deleting(function($role)
        {
            if (!method_exists('App\Role', 'bootSoftDeletingTrait'))
            {
                $role->users()->sync([]);
            }

            return true;
        });
    }

    //---------- relationships
    public function users()
    {
        return $this->belongsToMany('App\User', 'role_user');
    }

    //---------- mutators

    //---------- scopes
    public function scopeAdmin($query)
    {
        return $query->type(self::ADMIN);
    }

    public function scopeName($query, $name)
    {
        if (!empty($name))
        {
            return $query->where('name', $name);
        }
    }

    public function scopeType($query, $type)
    {
        if (!empty($type))
        {
            return $query->where('type', $type);
        }
    }

    //---------- helpers
}