<?php

namespace App\Http\Controllers\v1\Admin;

use App\Nrb\Http\v1\Controllers\ApiController;
use App\Services\SystemSettingServices;
use App\Http\Requests\v1\Admin\SystemSettingRequest;

class SystemSettingsController extends ApiController
{
    protected function excludeMethodsInLog()
    {
        return [
            'index',
            'get',
            'show',
        ];
    }

    protected function getMethods()
    {
        return [
            'store',
            'update',
        ];
    }

    /**
     * Get all system settings
     *
     * @SWG\Get(
     *     path="/admin/system-setting",
     *     tags={"Admin - System Settings"},
     *     summary="All System Settings",
     *     description="Get all system settings.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", type="array", items=@SWG\Property(ref="#/definitions/SystemSettingResponse"))
     *         )
     *     ),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     )
     * )
     *
     * @param SystemSettingServices $service
     *
     * @return mixed
     */
    public function index(SystemSettingServices $service)
    {
        return $service->index($this->request);
    }

    public function getSegment($segment, SystemSettingServices $service)
    {
        return $service->getSegment($segment);
    }

    /**
     * Get single system setting
     *
     * @SWG\Get(
     *     path="/admin/system-setting/{system_setting}",
     *     tags={"Admin - System Settings"},
     *     summary="Single System Setting",
     *     description="Get single system setting.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", ref="#/definitions/SystemSettingResponse")
     *         )
     *     ),
     *     @SWG\Response(response="204", description="No matches or no allowed matches found"),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(
     *         name="system_setting",
     *         in="path",
     *         description="System Setting ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     )
     * )
     *
     * @param $id
     * @param SystemSettingServices $service
     *
     * @return mixed
     */
    public function show($id, SystemSettingServices $service)
    {
        return $service->show($id);
    }

    /**
     * Add system setting
     *
     * @SWG\Post(
     *     path="/admin/system-setting",
     *     tags={"Admin - System Settings"},
     *     summary="Add System Setting",
     *     description="Add system setting.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", ref="#/definitions/SystemSettingResponse")
     *         )
     *     ),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(
     *         name="body",
     *         in="body",
     *         description="System Setting",
     *         required=true,
     *         type="object",
     *         @SWG\Schema(title="data", type="object", ref="#/definitions/SystemSetting"))
     *     )
     * )
     *
     * @param SystemSettingRequest $request
     * @param SystemSettingServices $service
     *
     * @return mixed
     */
    public function store(SystemSettingRequest $request, SystemSettingServices $service)
    {
        return $service->store($request);
    }

    /**
     * Update system setting value
     *
     * @SWG\Patch(
     *     path="/admin/system-setting/{system_setting}",
     *     tags={"Admin - System Settings"},
     *     summary="Edit System Setting",
     *     description="Update system setting value.",
     *     @SWG\Response(response="200", description="Success",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "data"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="true"),
     *             @SWG\Property(property="message", type="string", description="Success message", default="Success"),
     *             @SWG\Property(property="data", ref="#/definitions/SystemSettingResponse")
     *         )
     *     ),
     *     @SWG\Response(response="204", description="No matches or no allowed matches found"),
     *     @SWG\Response(response="403", description="Authentication Failed",
     *         @SWG\Schema(title="response", type="object", required={"success", "message", "messages"},
     *             @SWG\Property(property="success", type="boolean", description="Is success", default="false"),
     *             @SWG\Property(property="message", type="string", description="Error message", default="Authentication Failed"),
     *             @SWG\Property(property="messages", type="array", description="Other messages or instructions for user", items=""),
     *         )
     *     ),
     *     @SWG\Parameter(
     *         name="X-Token",
     *         in="header",
     *         description="X-Token",
     *         required=true,
     *         type="string",
     *         default=""
     *     ),
     *     @SWG\Parameter(
     *         name="system_setting",
     *         in="path",
     *         description="System Setting ID",
     *         required=true,
     *         type="string",
     *         default="1"
     *     ),
     *     @SWG\Parameter(
     *         name="body",
     *         in="body",
     *         description="System Setting",
     *         required=true,
     *         type="object",
     *         @SWG\Schema(title="data", type="object", ref="#/definitions/SystemSettingUpdate"))
     *     )
     * )
     *
     * @param SystemSettingRequest $request
     * @param $id
     * @param SystemSettingServices $service
     *
     * @return mixed
     */
    public function update(SystemSettingRequest $request, $id, SystemSettingServices $service)
    {
        return $service->update($request, $id);
    }
}