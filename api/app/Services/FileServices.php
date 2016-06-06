<?php

namespace App\Services;

use App;
use App\Models\SystemSetting;
use App\Nrb\NrbServices;

class FileServices extends NrbServices
{
    const PDF_EXT = 'pdf';

    private $data_bag;
    private $filename;
    private $template;

    private $auto_dl = false;

    public function __construct()
    {
        $this->storage_path = config('arbitrium.temp_storage');
    }

    public function addData($data)
    {
        if (!empty($data))
        {
            if (!is_array($data))
            {
                $data = $data->toArray();
            }
            if (empty($this->data_bag))
            {
                $this->data_bag = $data;
            }
            else
            {
                $this->data_bag = array_merge(
                    $this->data_bag,
                    $data
                );
            }
        }
    }

    public function downloadFile($storage_path, $filename, $ext)
    {
        if(file_exists($storage_path.$filename))
        {
            $this->createDownloadHeaders($filename, $ext);
            readfile($storage_path.$filename);
            exit();
        }
    }

    public function generateInvoicePDF($invoice)
    {
        $this->addData(SystemSetting::all()->lists('value', 'name'));
        $this->addData($invoice);
        $this->setFilename($invoice->invoice_no);
        $this->setTemplate('templates.invoice');
        return $this->generatePDF();
    }

    public function setFilename($value)
    {
        $this->filename = $value;
    }

    public function setStoragePath($value)
    {
        $this->storage_path = $value;
    }

    public function setTemplate($value)
    {
        $this->template = $value;
    }

    private function createDownloadHeaders($filename, $fileType)
    {
        header("Cache-Control: public");
        header("Content-Description: File Transfer");
        header("Content-Disposition: attachment; filename=\"$filename\"");
        header("Content-Type: application/$fileType");
        header("Content-Transfer-Encoding: binary");
    }

    private function generatePDF()
    {
        $pdf = \PDF::loadView($this->template, $this->data_bag);
        $this->setFilename($this->filename.".".self::PDF_EXT);

        if (!file_exists($this->storage_path))
        {
            mkdir($this->storage_path, 0777, true);
        }

        file_put_contents($this->storage_path.$this->filename, $pdf->output());

        return $this->storage_path.$this->filename;
    }

}
