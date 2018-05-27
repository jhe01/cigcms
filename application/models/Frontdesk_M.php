<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Frontdesk_M extends CI_Model 
{
	public function get()
	{
		$bagdrops = $this->db->get('bagdrop');
		return $bagdrops->result();
	}

}