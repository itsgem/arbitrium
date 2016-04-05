<?php
namespace App\Models\Logs;

use App\Nrb\NrbLogModel;

class AdminLog extends NrbLogModel
{
    protected $table = 'admin_logs';
}