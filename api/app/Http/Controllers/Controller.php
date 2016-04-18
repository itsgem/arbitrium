<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

/**
 * Class Controller
 *
 * @SWG\Swagger(
 *     schemes={"http", "https"},
 *     basePath="/api/v1",
 *     @SWG\Info(
 *         version="1.0.0",
 *         title="Arbitrium",
 *         description="A project by Arbitrium Group on decisions technology that helps make better decisions, such as financial, retail, pricing decisions, with data sets you already have.",
 *         @SWG\Contact(
 *             email="info@arbitriumgroup.com"
 *         )
 *     ),
 *     @SWG\ExternalDocumentation(
 *         description="Arbitrium GitHub",
 *         url="https://github.com/nerubia/arbitrium"
 *     )
 * )
 *
 * @package App\Http\Controllers
 */
abstract class Controller extends BaseController
{
    use DispatchesJobs, ValidatesRequests;
}
