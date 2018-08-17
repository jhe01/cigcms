<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TeeTime extends CI_Controller {

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
		$this->template->load('template/template', 'teetime/index', array());
	}

	public function fids()
	{
		$this->template->load('template/template', 'teetime/fids', array());
	}

	public function get_flights(){
		$this->load->model("TeeTime_M", "teetime");
		if($this->input->is_ajax_request()){
			$course = $this->input->post('course');
			//$course_id = $this->input->post('course_id');
			//$course_type = $this->input->post('course_type');
			
			$params = array();
			if($course){
				$params['course'] = $course = $this->input->post('course');
			}
			/*if($course_type != ""){
				$params['course_type'] = $this->convert_course_type($course_type);
			}*/

			$response["flight_f"] = $this->teetime->get_flights_on_flight($params);
			echo json_encode($response);
		}
	}

	public function get_courses(){
		if($this->input->is_ajax_request()){

			$this->load->model("TeeTime_M", "teetime");

			$response["courses"] = $this->teetime->get_golfcourses();
			echo json_encode($response);
		}		
	}

	public function get_club_settings(){
		if($this->input->is_ajax_request()){
			$club_id = $this->input->post('club_id');
			$this->load->model("TeeTime_M", "teetime");

			$response["club"] = $this->teetime->get_settings($club_id);
			//$response["courses"] = $this->teetime->get_golfcourses();
			echo json_encode($response);
		}
	}

	public function convert_course_type($course_type){
		$c_type = '';
		if($course_type == 'F-9'){
			$c_type = 'Front 9';
		}elseif($course_type == 'B-9'){
			$c_type = 'Back 9';
		}

		return $c_type;
	}
	
}
