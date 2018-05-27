<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Golfer_M extends CI_Model 
{
	public function get()
	{
		//$players = $this->db->select('salutation, firstName, lastName, photo')->get('golfer');
		$players = $this->db->get('golfer');
		return $players->result();
	}

	public function get_golfer($tag){
		$params = array('nfc_tag' => $tag, 'teedate' => date('Y-m-d'));

		$player = $this->db->select('golfer.golfer_id, golfer.ID, golfer.salutation, golfer.firstName, golfer.lastName, golfer.photo, booking.teedate, booking.booking_no, booking.f9_starttime')
		->from('booking')
		->join('golfer', 'golfer.golfer_id = booking.golfer_id')
		->where($params)
		->get();

		return $player->row();
	}

	public function checkin_golfer($data, $u_params, $i_params){
		$bag_drop = array(
			'golfer_id' => $i_params['golfer_id_int'],
			'bct' => $i_params['bct'],
			'bagdrop_dt' => date('Y-m-d H:i:s'),
			'bagdrop_id' => nuID(),
		);

		$this->db->where($u_params);
		$this->db->update('booking', $data);
		$this->db->insert('bagdrop', $bag_drop);

		if($this->db->insert_id()){
			return $this->db->select('golfer.golfer_id, golfer.ID, golfer.salutation, golfer.firstName, golfer.lastName, golfer.photo, booking.teedate, booking.booking_no, booking.f9_starttime')
			->from('booking')
			->join('golfer', 'golfer.golfer_id = booking.golfer_id')
			->where('golfer.golfer_id', $u_params['golfer_id'])
			->get()
			->row();
		}else{
			return false;
		}
	}

	public function get_golfer_with_id($golfer_id){
		$golfer = $this->db->get('golfer')->where('golfer_id', $golfer_id);
		return $golfer->row();
	}
}