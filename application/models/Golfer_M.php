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

		$player = $this->db->select('golfer.golfer_id, golfer.ID, golfer.salutation, golfer.firstName, golfer.lastName, golfer.photo')
		->from('golfer')
		->where('nfc_tag', $params['nfc_tag'])
		->get();

		$count = 0;
		$response['golfer'] = $player->row();

		$booking = $this->db->select('*')
		->from('booking')
		->where('teedate', $params['teedate'], 'golfer_id', $response['golfer']->golfer_id)
		->get();

		if($booking->num_rows() > 0){
			$response['booking'] = $booking->row();
		}

		return $response;
	}

	public function checkin_golfer($data, $u_params, $i_params){
		$bag_drop = array(
			'golfer_id' => $i_params['golfer_id_int'],
			'bct' => $i_params['bct'],
			'bagdrop_dt' => date('Y-m-d H:i:s'),
			'bagdrop_id' => nuID(),
		);

		$this->db->insert('bagdrop', $bag_drop);

		if($this->db->insert_id()){
			if($u_params['booking_no']){
				$booking = $this->db->where($u_params)->get('booking');

				if($booking->num_rows() > 0){
					$this->db->where($u_params);
					$this->db->update('booking', $data);
				}
			}
			
			$response['golfer'] = $this->db->select('golfer_id, ID, salutation, firstName, lastName, photo')
			->from('golfer')
			->where('golfer_id', $u_params['golfer_id'])
			->get()
			->row();

			$bkng = $this->db->select('*')
			->from('booking')
			->where('teedate', $booking->row()->teedate, 'golfer_id', $response['golfer']->golfer_id)
			->get();

			if($bkng->num_rows() > 0){
				$response['booking'] = $bkng->row();
			}

			return $response;
		}else{
			return false;
		}
	}


}