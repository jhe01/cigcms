<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Frontdesk_M extends CI_Model 
{
	public function get()
	{
		$bagdrops = $this->db->select('golfer.golfer_id, golfer.ID, golfer.salutation, golfer.firstName,golfer.middleName, golfer.lastName, golfer.photo, bagdrop.*, booking.daycard, booking.ID, booking.booking_id, booking.teedate')
		->from('bagdrop')
		->join('golfer', 'golfer.ID = bagdrop.golfer_id')
		->join('booking', 'booking.golfer_id = golfer.golfer_id')
		->where('booking.teedate', date('Y-m-d'))->get();

		return $bagdrops->result();
	}

}