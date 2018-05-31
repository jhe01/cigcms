<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Frontdesk_M extends CI_Model 
{
	public function get()
	{
		$params = array(
			'bagdrop.bagdrop_dt >=' => date('Y-m-d').' 00:00:00', 
			'bagdrop.bagdrop_dt <=' => date('Y-m-d').' 23:59:00', 
		);
		$bagdrops = $this->db->select('golfer.golfer_id As g_id, golfer.ID As g_iid, golfer.salutation, golfer.firstName,golfer.middleName, golfer.lastName, golfer.photo, bagdrop.*')
		->from('bagdrop')
		->join('golfer', 'golfer.ID = bagdrop.golfer_id')
		->where($params)->get()->result();

		$booking = $this->db->where(array('teedate' => date('Y-m-d'), 'status' => 'Checked-in'))->get('booking')->result();
		$cnt = 0;
		$b_cnt = 0;
		foreach($bagdrops as $bd){	
			foreach($booking as $b){
				if($bd->g_id == $b->golfer_id){
					$bd->booking = $b;
					//array_push($b[$b_cnt], array('booking' => $b[$cnt]));
				}
				$b_cnt++;
			}
			$cnt++;
		}
		/*var_dump(property_exists($bagdrops[0], 'booking'));
		exit();
		
		$response['bagdrops'] = $bagdrops;
		$response['booking'] = $booking;*/
		return $bagdrops;
	}

}