<?php

use Illuminate\Database\Seeder;
use App\Models\DropdownList;

class DropdownListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("SET FOREIGN_KEY_CHECKS = 0");
        DB::table('dropdown_lists')->truncate();
        DB::table('dropdown_lists')->insert([
            ['name' => 'Laptop', 'type' => DropdownList::ELECTRONIC_DEVICE],
            ['name' => 'Desktop Computers', 'type' => DropdownList::ELECTRONIC_DEVICE],
            ['name' => 'Tablet', 'type' => DropdownList::ELECTRONIC_DEVICE],
            ['name' => 'Smartphone', 'type' => DropdownList::ELECTRONIC_DEVICE],
            ['name' => DropdownList::OTHERS_DISPLAY, 'type' => DropdownList::ELECTRONIC_DEVICE]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Dog', 'type' => DropdownList::PET],
            ['name' => 'Cats', 'type' => DropdownList::PET],
            ['name' => 'Small Pets', 'type' => DropdownList::PET],
            ['name' => DropdownList::OTHERS_DISPLAY, 'type' => DropdownList::PET]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Chinese', 'type' => DropdownList::ETHNICITY],
            ['name' => 'Malay', 'type' => DropdownList::ETHNICITY],
            ['name' => 'Indian', 'type' => DropdownList::ETHNICITY],
            ['name' => 'Caucasian/White', 'type' => DropdownList::ETHNICITY],
            ['name' => DropdownList::OTHERS_DISPLAY, 'type' => DropdownList::ETHNICITY]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Not Religious', 'type' => DropdownList::RELIGION],
            ['name' => 'Hinduism', 'type' => DropdownList::RELIGION],
            ['name' => 'Buddhism', 'type' => DropdownList::RELIGION],
            ['name' => 'Taoism', 'type' => DropdownList::RELIGION],
            ['name' => 'Judaism', 'type' => DropdownList::RELIGION],
            ['name' => 'Christian', 'type' => DropdownList::RELIGION],
            ['name' => 'Islam', 'type' => DropdownList::RELIGION],
            ['name' => DropdownList::OTHERS_DISPLAY, 'type' => DropdownList::RELIGION]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Now Married', 'type' => DropdownList::MARITAL_STATUS],
            ['name' => 'Widowed', 'type' => DropdownList::MARITAL_STATUS],
            ['name' => 'Divorced', 'type' => DropdownList::MARITAL_STATUS],
            ['name' => 'Separated', 'type' => DropdownList::MARITAL_STATUS],
            ['name' => 'Never Married', 'type' => DropdownList::MARITAL_STATUS]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Apartment/Condo', 'type' => DropdownList::HOUSING_TYPE],
            ['name' => 'Terrace/Townhouse', 'type' => DropdownList::HOUSING_TYPE],
            ['name' => 'Semi-detached', 'type' => DropdownList::HOUSING_TYPE],
            ['name' => 'Detached', 'type' => DropdownList::HOUSING_TYPE],
            ['name' => 'Bungalow', 'type' => DropdownList::HOUSING_TYPE],
            ['name' => 'RV', 'type' => DropdownList::HOUSING_TYPE]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'O+', 'type' => DropdownList::BLOOD_TYPE],
            ['name' => 'O-', 'type' => DropdownList::BLOOD_TYPE],
            ['name' => 'A+', 'type' => DropdownList::BLOOD_TYPE],
            ['name' => 'A-', 'type' => DropdownList::BLOOD_TYPE],
            ['name' => 'B+', 'type' => DropdownList::BLOOD_TYPE],
            ['name' => 'B-', 'type' => DropdownList::BLOOD_TYPE],
            ['name' => 'AB+', 'type' => DropdownList::BLOOD_TYPE],
            ['name' => 'AB-', 'type' => DropdownList::BLOOD_TYPE]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Top Manager (CXO Equivalent)', 'type' => DropdownList::JOB_TITLE],
            ['name' => 'Senior Manager', 'type' => DropdownList::JOB_TITLE],
            ['name' => 'Middle Manage', 'type' => DropdownList::JOB_TITLE],
            ['name' => 'First-Line Manager', 'type' => DropdownList::JOB_TITLE],
            ['name' => 'Non-managerial Employees', 'type' => DropdownList::JOB_TITLE],
            ['name' => 'Technical Staff', 'type' => DropdownList::JOB_TITLE],
            ['name' => 'Business Owner', 'type' => DropdownList::JOB_TITLE]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Less than $10,000', 'type' => DropdownList::INCOME],
            ['name' => '$10,000 to $19,999', 'type' => DropdownList::INCOME],
            ['name' => '$20,000 to $29,999', 'type' => DropdownList::INCOME],
            ['name' => '$30,000 to $39,999', 'type' => DropdownList::INCOME],
            ['name' => '$40,000 to $49,999', 'type' => DropdownList::INCOME],
            ['name' => '$50,000 to $59,999', 'type' => DropdownList::INCOME],
            ['name' => '$60,000 to $69,999', 'type' => DropdownList::INCOME],
            ['name' => '$70,000 to $79,999', 'type' => DropdownList::INCOME],
            ['name' => '$80,000 to $89,999', 'type' => DropdownList::INCOME],
            ['name' => '$90,000 to $99,999', 'type' => DropdownList::INCOME],
            ['name' => '$100,000 or more', 'type' => DropdownList::INCOME]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Resources (Oil, Gas, Agriculture, Fishing, Mining)', 'type' => DropdownList::INDUSTRY],
            ['name' => 'Manufacturing', 'type' => DropdownList::INDUSTRY],
            ['name' => 'Utilities (Electricity, Gas &amp; Water Supplie, Sewagem Waste Management)', 'type' => DropdownList::INDUSTRY],
            ['name' => 'Real Estate & Contruction', 'type' => DropdownList::INDUSTRY],
            ['name' => 'Wholesale & Retail Trade', 'type' => DropdownList::INDUSTRY],
            ['name' => DropdownList::OTHERS_DISPLAY, 'type' => DropdownList::INDUSTRY]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Passport', 'type' => DropdownList::KYC],
            ['name' => 'Driver\'s license', 'type' => DropdownList::KYC],
            ['name' => 'Social Security ID', 'type' => DropdownList::KYC]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Small',   'type' => DropdownList::TEXT_WIDTH],
            ['name' => 'Medium',  'type' => DropdownList::TEXT_WIDTH],
            ['name' => 'Large',   'type' => DropdownList::TEXT_WIDTH]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'English', 'type' => DropdownList::LANGUAGE]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Primary School & Below', 'type' => DropdownList::EDUCATION],
            ['name' => 'Secondary School & Pre-University', 'type' => DropdownList::EDUCATION],
            ['name' => 'Technical Education', 'type' => DropdownList::EDUCATION],
            ['name' => 'Polytechnic', 'type' => DropdownList::EDUCATION],
            ['name' => 'University', 'type' => DropdownList::EDUCATION],
            ['name' => 'Postgraduate', 'type' => DropdownList::EDUCATION]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Employed for wages', 'type' => DropdownList::EMPLOYMENT_STATUS],
            ['name' => 'Self-employed', 'type' => DropdownList::EMPLOYMENT_STATUS],
            ['name' => 'Out of work and looking for work', 'type' => DropdownList::EMPLOYMENT_STATUS],
            ['name' => 'Out of work but not currently looking for work', 'type' => DropdownList::EMPLOYMENT_STATUS],
            ['name' => 'A homemaker', 'type' => DropdownList::EMPLOYMENT_STATUS],
            ['name' => 'A student', 'type' => DropdownList::EMPLOYMENT_STATUS],
            ['name' => 'Retired', 'type' => DropdownList::EMPLOYMENT_STATUS],
            ['name' => 'Unable to work', 'type' => DropdownList::EMPLOYMENT_STATUS]
        ]);
        DB::table('dropdown_lists')->insert([
            ['name' => 'Basketball', 'type' => DropdownList::SPORT],
            ['name' => 'Baseball', 'type' => DropdownList::SPORT],
            ['name' => 'Swimming', 'type' => DropdownList::SPORT],
            ['name' => DropdownList::OTHERS_DISPLAY, 'type' => DropdownList::SPORT]
        ]);
        DB::statement("SET FOREIGN_KEY_CHECKS = 1");
    }
}
