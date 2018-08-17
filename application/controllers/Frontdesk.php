<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Frontdesk extends CI_Controller {

	public function __construct(){		
		return parent::__construct();		
	}
	
	public function index()
	{
		$this->load->model('Frontdesk_M', 'frontdesk');
		$data = array(
			'arrived_golfers' => $this->frontdesk->get()
		);

		//$this->template->load('template/template', 'frontdesk/index', $data);
	}
}
