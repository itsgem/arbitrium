<?php

namespace App\Services;

use App\Nrb\NrbServices;
use App\Models\Role;

class RoleServices extends NrbServices
{
    // RolesController::getAdminRoles
    public function getAdminRoles()
    {
        return $this->respondWithData(
            Role::select('id', 'display_name')->admin()->orderBy('display_name')->get()
        );
    }
}
