<?php

namespace App\Services;

use App\Nrb\NrbServices;

class LogServices extends NrbServices
{
    // Admin\LogsController::showAdminLogs
    // Admin\LogsController::showClientLogs
    public function showLogs($request, $logs)
    {
        return $this->respondWithData(
            $logs::select(['id', 'user_id', 'username', 'email_address', 'name', 'ip_address', 'user_agent', 'page_accessed', 'created_at'])
            ->emailAddressLike($request->get("email_address"))
            ->username($request->get("username"))
            ->createdDateFrom($request->get("date_from"))
            ->createdDateTo($request->get("date_to"))
            ->action($request->get("action"))
            ->latest()
            ->paginate($request->get('per_page')),
            $request->get('max_pagination_links')
        );
    }
}
