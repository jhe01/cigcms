<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Golfer extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		
	}

	public function get(){
		if($this->input->is_ajax_request()){
			$this->load->model('Golfer_M', 'golfer_m');

			$golfers = $this->golfer_m->get();		
			$response['status'] = 'OK';
			$response['data'] = $golfers;
			echo json_encode($response);
		}
	}

	public function get_golfer(){
		if($this->input->is_ajax_request()){
			$tag = $this->input->post('tag');
			$this->load->model('Golfer_M', 'golfer_m');

			$data = $this->golfer_m->get_golfer($tag);		
			$response['status'] = 'OK';
			$response['data'] = $data;
			echo json_encode($response);
		}
	}

	public function checkin_golfer(){
		if($this->input->is_ajax_request()){
			$u_data = array(
				'status' => $this->input->post('status')
			);

			$u_params = array(
				'golfer_id' => $this->input->post('golferId'),
			);

			if($this->input->post('bookingId')){
				$u_params['booking_no'] = $this->input->post('bookingId');
			}

			$i_params = array(
				'bct' =>  $this->input->post('bct'),
				'golfer_id_int' =>  $this->input->post('golferIdInt'),
			);

			$this->load->model('Golfer_M', 'golfer_m');
			
			$data = $this->golfer_m->checkin_golfer($u_data, $u_params, $i_params);

			$response['status'] = 'OK';
			$response['data'] = $data;

			echo json_encode($response);
		}
	}
}
