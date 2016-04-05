<?php

namespace App\Models\Traits;

trait RoleUserTrait
{
    /**
     * Boot the user model
     * Attach event listener to remove the many-to-many records when trying to delete
     * Will NOT delete any records if the user model uses soft deletes.
     *
     * @return void|bool
     */
    public static function boot()
    {
        parent::boot();

        static::deleting(function($user)
        {
            if (!method_exists('App\User', 'bootSoftDeletingTrait'))
            {
                $user->roles()->sync([]);
            }

            return true;
        });
    }

    /**
     * Many-to-Many relations with Role.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany('App\Models\Role', 'role_user', 'user_id', 'role_id');
    }

    /**
     * Alias to eloquent many-to-many relation's attach() method.
     *
     * @param mixed $role
     */
    public function attachRole($role)
    {
        if(is_object($role))
        {
            $role = $role->getKey();
        }

        if(is_array($role))
        {
            $role = $role['id'];
        }

        $this->roles()->attach($role);
    }

    /**
     * Attach multiple roles to a user
     *
     * @param mixed $roles
     */
    public function attachRoles($roles)
    {
        foreach ($roles as $role)
        {
            $this->attachRole($role);
        }
    }

    /**
     * Alias to eloquent many-to-many relation's detach() method.
     *
     * @param mixed $role
     */
    public function detachRole($role)
    {
        if (is_object($role))
        {
            $role = $role->getKey();
        }

        if (is_array($role))
        {
            $role = $role['id'];
        }

        $this->roles()->detach($role);
    }

    /**
     * Detach multiple roles from a user
     *
     * @param mixed $roles
     */
    public function detachRoles($roles)
    {
        foreach ($roles as $role)
        {
            $this->detachRole($role);
        }
    }

    /**
     * Checks if the user has a role by its name.
     *
     * @param string|array $name       Role name or array of role names.
     * @param bool         $requireAll All roles in the array are required.
     *
     * @return bool
     */
    public function hasRole($name, $requireAll = false)
    {
        if (is_array($name))
        {
            foreach ($name as $roleName)
            {
                $hasRole = $this->hasRole($roleName);

                if ($hasRole && !$requireAll)
                {
                    return true;
                }
                elseif (!$hasRole && $requireAll)
                {
                    return false;
                }
            }

            // If we've made it this far and $requireAll is FALSE, then NONE of the roles were found
            // If we've made it this far and $requireAll is TRUE, then ALL of the roles were found.
            // Return the value of $requireAll;
            return $requireAll;
        }
        else
        {
            foreach ($this->roles as $role)
            {
                if ($role->name == $name)
                {
                    return true;
                }
            }
        }

        return false;
    }

    public function syncRoles($roles)
    {
        if (is_array($roles))
        {
            $this->roles()->sync($roles);
        }
    }

    public function scopeRole($query, $role_ids)
    {
        if ($role_ids)
        {
            if (!is_array($role_ids))
            {
                $role_ids = [$role_ids];
            }

            return $query->whereHas('roles', function ($query) use ($role_ids){
                    $query->whereIn('role_id', $role_ids);
                });
        }
    }
}
