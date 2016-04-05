<?php

namespace App\Nrb;

use DB;
use Illuminate\Database\Eloquent\Model;

class NrbModel extends Model
{
    public $force_null = [];

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $user = auth()->user();
            if ($user)
            {
                if ($model->isFillable('created_by'))
                {
                    $model->created_by = $user->id;
                }
                if ($model->isFillable('updated_by'))
                {
                    $model->updated_by = $user->id;
                }
            }
        });

        static::saving(function($model) {
            $a_data = $model->toArray();
            foreach ($a_data as $name => $value)
            {
                if (in_array($name, $model->force_null))
                {
                    $model->{$name} = isset($value) && strlen($value) ? $value : NULL;
                }
            }

            return true;
        });

        static::updating(function($model)
        {
            $user = auth()->user();
            if ($user && $model->isFillable('updated_by'))
            {
                $model->updated_by = $user->id;
            }
        });
    }

    //---------- scopes
    public function scopeDateFrom($query, $field, $from, $time = false)
    {
        if ($from)
        {
            return $query->where($field, '>=', $from.($time ? ' 00:00:00' : ''));
        }
    }

    public function scopeDateTo($query, $field, $to, $time = false)
    {
        if ($to)
        {
            return $query->where($field, '<=', $to.($time ? ' 23:59:59' : ''));
        }
    }

    public function scopeGreaterThanOrEqualTo($query, $field, $value)
    {
        if ($value)
        {
            return $query->where($field, '>=', $value);
        }
    }

    public function scopeLessThanOrEqualTo($query, $field, $value)
    {
        if ($value)
        {
            return $query->where($field, '<=', $value);
        }
    }

    public function scopeLike($query, $field, $value)
    {
        if ($value)
        {
            return $query->where($field, 'LIKE', "%$value%");
        }
    }

    public function scopeOrLike($query, $field, $value)
    {
        if ($value)
        {
            return $query->orWhere($field, 'LIKE', "%$value%");
        }
    }

    public function scopeOrderByNullableField($query, $field, $order = 'ASC')
    {
        return $query->orderBy(DB::raw("ISNULL($field)"), $order);
    }

    public function scopeOrderByZeroableField($query, $field, $order = 'ASC')
    {
        return $query->orderBy(DB::raw("$field = 0, $field"), $order);
    }

    //---------- helpers
    public static function getListFromArray($a_data = [])
    {
        $a_values = [];
        foreach($a_data as $category)
        {
            $a_values[] = ['id' => $category, 'display_name' => $category];
        }
        return $a_values;
    }
}
