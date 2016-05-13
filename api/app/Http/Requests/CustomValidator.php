<?php

namespace App\Http\Requests;

use Illuminate\Validation\Validator;
use App\Models\CommonPassword;
use App\Models\DropdownList;
use App\User;

class CustomValidator extends Validator
{
    protected function replaceDateAfterOrEqual($message, $attribute, $rule, $parameters)
    {
        return str_replace(':date', $this->getAttribute($parameters[0]), $message);
    }

    protected function replaceDateBeforeOrEqual($message, $attribute, $rule, $parameters)
    {
        return str_replace(':date', $this->getAttribute($parameters[0]), $message);
    }

    protected function replaceDateRange($message, $attribute, $rule, $parameters)
    {
        return str_replace(':other', $this->getAttribute($parameters[0]), $message);
    }

    protected function replaceGreaterThan($message, $attribute, $rule, $parameters)
    {
        return str_replace(':other', $this->getAttribute($parameters[0]), $message);
    }

    protected function replaceGreaterThanEqual($message, $attribute, $rule, $parameters)
    {
        return str_replace(':other', $this->getAttribute($parameters[0]), $message);
    }

    protected function replaceMax($message, $attribute, $rule, $parameters)
    {
        $max = $parameters[0];
        if (is_numeric($max))
        {
            $max = number_format($max);
        }
        return str_replace(':max', $max, $message);
    }

    public function validateAlphaDashDot($attribute, $value)
    {
        return preg_match("/^[a-zA-Z0-9_\-\.]+$/", $value);
    }

    public function validateMoney($attribute, $value)
    {
        return preg_match("/^[0-9]+(?:\.[0-9]{2}){0,1}$/", $value);
    }

    public function validateCommonPassword($attribute, $value)
    {
        $model = CommonPassword::password($value)->first();

        return $model ? false : true;
    }

    /**
     * Validate the date is after or equal a given date.
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @param  array   $parameters
     * @return bool
     */
    public function validateDateAfterOrEqual($attribute, $value, $parameters)
    {
        $this->requireParameterCount(1, $parameters, 'date_after_or_equal');

        if ($this->validateDateFormat($attribute, $value, ['Y-m-d']))
        {
            if (! ($date = strtotime($parameters[0])))
            {
                // other date field is not required
                if (!$this->getValue($parameters[0]))
                {
                    return true;
                }
                return strtotime($value) >= strtotime($this->getValue($parameters[0]));
            }

            return strtotime($value) >= $date;
        }
        return false;
    }

    public function validateDateBeforeOrEqual($attribute, $value, $parameters)
    {
        $this->requireParameterCount(1, $parameters, 'date_before_or_equal');

        if ($this->validateDateFormat($attribute, $value, ['Y-m-d']))
        {
            if (! ($date = strtotime($parameters[0])))
            {
                // other date field is not required
                if (!$this->getValue($parameters[0]))
                {
                    return true;
                }
                return strtotime($value) <= strtotime($this->getValue($parameters[0]));
            }

            return strtotime($value) <= $date;
        }
        return false;
    }

    public function validateDateRange($attribute, $value, $parameters)
    {
        $valid = true;
        $date_to = $this->getValue($parameters[0]);

        if(strtotime($value) > strtotime($date_to))
        {
            $valid = false;
        }

        return $valid;
    }

    public function validateDigit($attribute, $value)
    {
        return preg_match("/^[0-9]+$/", $value);
    }

    // values exists in Dropdown list table based on Type
    public function validateDropdownExists($attribute, $value, $parameters)
    {
        $this->requireParameterCount(1, $parameters, 'dropdown_exists');

        if (empty($value) && $value != 0)
        {
            return true;
        }

        return $this->validateExists($attribute, $value, [(new DropdownList())->getTable(), 'id', 'type', $parameters[0]]);
    }

    // if "Others" is selected, {fieldname}_other should not be empty
    public function validateDropdownExistsWithOthers($attribute, $value, $parameters)
    {
        $this->requireParameterCount(1, $parameters, 'dropdown_exists_with_others');

        if (empty($value) && $value != 0)
        {
            return true;
        }

        $fieldname_others = $parameters[0].'_others';
        $fieldvalue_others = $this->getValue($fieldname_others);
        $id_others = DropdownList::getOthersId($parameters[0]);

        if (is_array($value))
        {
            if (in_array($id_others, $value) && empty($fieldvalue_others))
            {
                $this->addError($fieldname_others, 'required', $parameters);
            }
            return DropdownList::type($parameters[0])->idIn($value)->count() == count($value);
        }

        if ($id_others == $value && empty($fieldvalue_others))
        {
            $this->addError($fieldname_others, 'required', $parameters);
        }
        return $this->validateExists($attribute, $value, [(new DropdownList())->getTable(), 'id', 'type', $parameters[0]]);
    }

    public function validateFutureDate($attribute, $value)
    {
        return $this->validateDate($attribute, $value) &&
                $this->validateDateFormat($attribute, $value, ['Y-m-d']) &&
                create_date_from_Ymd($value)->isFuture();
    }

    public function validateGender($attribute, $value)
    {
        return in_array((string) $value, ['Male', 'Female']);
    }

    public function validateGreaterThan($attribute, $value, $parameters)
    {
        $this->requireParameterCount(1, $parameters, 'greater_than');
        $greater = $this->getValue($parameters[0]);
        $greater_equal = $this->getValue($parameters[0].'_equal');
        $other = $greater ? $greater : $greater_equal;

        return (isset($other) && $value > $other) || empty($other);
    }

    public function validateGreaterThanEqual($attribute, $value, $parameters)
    {
        $this->requireParameterCount(1, $parameters, 'greater_than_equal');
        $greater = $this->getValue($parameters[0]);
        $greater_equal = $this->getValue($parameters[0].'_equal');
        $other = $greater ? $greater : $greater_equal;

        return (isset($other) && $value >= $other) || empty($other);
    }

    public function validateHex($attribute, $value)
    {
        return preg_match("/^#(?:[0-9a-fA-F]{3}){1,2}$/", $value);
    }

    public function validatePassword($attribute, $value)
    {
        $valid = true;
        if (!preg_match("#[0-9]+#", $value))
        {
            $valid = false;
        }

        if (!preg_match("#[a-z]+#", $value))
        {
            $valid = false;
        }

        if (!preg_match("#[A-Z]+#", $value))
        {
            $valid = false;
        }
        return $valid;
    }

    public function validatePastDate($attribute, $value)
    {
        return $this->validateDate($attribute, $value) &&
                $this->validateDateFormat($attribute, $value, ['Y-m-d']) &&
                create_date_from_Ymd($value)->isPast();
    }

    public function validateRequiredEither($attribute, $value, $parameters)
    {
        $this->requireParameterCount(1, $parameters, 'required_either');
        return $value || $this->getValue($parameters[0]);
    }

    /**
     * Validate the uniqueness of username.
     * If username belongs to a client, and the approval_status is disapproved,
     * username can be re-used.
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @param  array   $parameters - id,NULL
     * @return bool
     */
    public function validateUniqueUsername($attribute, $value, $parameters)
    {
        $id = null;
        $valid = true;
        if (strtolower($parameters[1]) != 'null' )
        {
            $id = $parameters[1];
        }

        $user_query = User::username($value)->notId($id);
        $user_count = $user_query->count();
        if ($user_count > 0)
        {
            $valid = false;
            $client_count = $user_query->userTypeClient()->count();
            if ($client_count)
            {
                $clients = $user_query->whereHas('client', function($query){
                    $query->approvalStatusNotDisapproved();
                })->first();
                if (!$clients)
                {
                    $valid = true;
                }
            }
        }

        return $valid;
    }

    /**
     * Validate the uniqueness of an attribute on the users table.
     *
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @param  array   $parameters - email_address,user_type,2,id,NULL
     * @return bool
     */
    public function validateUniqueUsersByUserType($attribute, $value, $parameters)
    {
        $this->requireParameterCount(5, $parameters, 'unique_users_by_user_type');

        $id = null;
        if (strtolower($parameters[4]) != 'null' )
        {
            $id = $parameters[4];
        }

        $user = User::where($parameters[0], $value)
                        ->where($parameters[1], $parameters[2])
                        ->notId($id);
        if ($parameters[2] == User::CLIENT)
        {
            $user = $user->whereHas('client', function($query){
                $query->approvalStatusNotDisapproved();
            });
        }

        return $user->first() ? false : true;
    }
}