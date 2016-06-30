<?php

namespace App\Services;

use DB;

use App\Errors;
use App\Models\Admin;
use App\Models\Role;
use App\Nrb\NrbServices;
use App\User;

class AdminUserServices extends NrbServices
{
    // Admin\AdminsController::destroy
    public function destroy($id)
    {
        return DB::transaction(function () use ($id)
        {
            $admin = Admin::findOrFail($id);
            if ($admin->user->canDelete())
            {
                // [Core-API] Delete account
                $admin->user->removeApiCredentials();

                $admin->delete();
                return $this->respondWithSuccess($admin);
            }
            return $this->respondWithError(Errors::CANNOT_DELETE, ['str_replace' => ['model' => 'User']]);
        });
    }

    // Admin\AdminsController::index
    public function index($request)
    {
        return $this->respondWithData(
            Admin::select('id', 'user_id')
            ->with(['user' => function($query){
                $query->select('id', 'username', 'email_address', 'name', 'login_attempts', 'locked_at')
                    ->with(['roles' => function($query){
                        $query->select('display_name');
                    }]);
            }])
            ->whereHas('user', function ($query) use ($request){
                    $query->nameLike($request->get('name'))
                            ->emailLike($request->get('email_address'))
                            ->role($request->get('role_id'))
                            ->usernameLike($request->get('username'))
                            ->userType($request->get('user_type'));
            })
            ->paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }

    // Admin\AdminsController::show
    public function show($request, $id)
    {
        $admin = new Admin();
        if ($request->get('with-user'))
        {
            $admin = $admin->with(['user' => function($query){
                $query->select('id', 'username', 'email_address', 'login_attempts', 'locked_at', 'items_per_page', 'timezone')
                        -> with(['roles' => function($query){
                            $query->select('id', 'display_name');
                        }]);
            }]);
        }
        return $this->respondWithSuccess($admin->findOrFail($id));
    }

    // Admin\AdminsController::store
    public function store($request)
    {
        return DB::transaction(function () use ($request)
        {
            $user = User::create($request->all());
            $user->attachRole(Role::find($request->get('role_id')));
            $user->admin()->save(new Admin($request->all()));

            // [Core-API] Signup
            $user->registerApiCredentials([
                'username'  => $user->username,
                'password'  => $user->password,
                'userType' => User::ADMIN,
            ]);

            return $this->respondWithSuccess($user);
        });
    }

    // Admin\AdminsController::update
    public function update($request, $id)
    {
        return DB::transaction(function () use ($request, $id)
        {
            $admin = Admin::findOrFail($id);
            $admin->update($request->except('user_id'));

            $user = User::find($admin->user_id);
            $old_auth = ($user->api) ? $user->api->getAuth() : null;

            $user->syncRoles([Role::findOrFail($request->get('role_id'))->id]);
            $user->update($request->only('username', 'email_address', 'password', 'items_per_page', 'timezone'));

            // [Core-API] Update username, password, user_type
            $user->updateApiCredentials([
                'username' => $user->username,
                'password' => $user->password,
            ], $old_auth);

            return $this->respondWithSuccess($admin);
        });
    }
}
