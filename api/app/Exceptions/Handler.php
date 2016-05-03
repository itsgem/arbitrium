<?php

namespace App\Exceptions;

use Exception;
use BadMethodCallException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use App\Errors;
use App\Nrb\Http\v1\Traits\JsonResponseTrait;

use Slack;

class Handler extends ExceptionHandler
{
    use JsonResponseTrait;
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
        ModelNotFoundException::class,
        UnauthorizedException::class,
        ExpiredSessionException::class
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        if (app()->environment() != 'local' && $this->shouldReport($e))
        {
            Slack::send(
                ' ```'.$e->getMessage().'```'.
                ' `'.$e->getFile().':'.$e->getLine().'`'.
                "\n\n".
                $e->getTraceAsString()
            );
        }
        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        return parent::render($request, $e);
        if ($e instanceof ModelNotFoundException)
        {
            return $this->respondWithError(Errors::NO_CONTENT);
        }
        if ($e instanceof UnauthorizedException)
        {
            return $this->respondWithError(Errors::UNAUTHORIZED);
        }
        if ($e instanceof ExpiredSessionException)
        {
            return $this->respondWithError(Errors::EXPIRED_SESSION);
        }
        if ($e instanceof NotFoundHttpException)
        {
            return $this->respondWithError(Errors::NOT_FOUND);
        }
        if ($e instanceof MethodNotAllowedHttpException)
        {
            return $this->respondWithError(Errors::NOT_FOUND);
        }
        if ($e instanceof BadMethodCallException)
        {
            return $this->respondWithError(Errors::NOT_FOUND);
        }
        return parent::render($request, $e);
    }
}
