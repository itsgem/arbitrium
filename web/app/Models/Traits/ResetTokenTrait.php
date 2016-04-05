<?php

namespace App\Models\Traits;

use App\Models\ResetToken;

trait ResetTokenTrait
{
    public function reset_token()
    {
        return $this->hasOne('App\Models\ResetToken');
    }

    public function scopeCode($query, $field, $code)
    {
        return $query->whereHas('reset_token', function($query) use ($field, $code)
        {
            $query->code($field, $code);
        });
    }

    public function scopeCodeOrToken($query, $field, $code)
    {
        return $query->whereHas('reset_token', function($query) use ($field, $code)
        {
            return $query->codeOrToken($field, $code);
        });
    }

    public function scopeToken($query, $field, $code)
    {
        return $query->whereHas('reset_token', function($query) use ($field, $code)
        {
            $query->token($field, $code);
        });
    }

    public function generateTokens($field)
    {
        ResetToken::firstOrCreate(['user_id' => $this->id])->generateTokens($field);
    }

    public function getCodeField($field)
    {
        $value = '';
        if ($this->reset_token)
        {
            $value = $this->reset_token->getCodeField($field);
        }
        return $value;
    }

    public function getTokenField($field)
    {
        $value = '';
        if ($this->reset_token)
        {
            $value = $this->reset_token->getTokenField($field);
        }
        return $value;
    }

    public function resetTokens($field)
    {
        if ($this->reset_token)
        {
            $this->reset_token->resetTokens($field);
        }
    }
}