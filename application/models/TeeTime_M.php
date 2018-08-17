<?php defined('BASEPATH') OR exit('No direct script access allowed');

class TeeTime_M extends CI_Model 
{
	public function get_flights_on_flight($params)
	{
		/*$this->db->where($params);
		$this->db->order_by("teetime", "asc");
		$flight_query = $this->db->get("flight")->result();

		$flightMates = $this->db->select("flightmate.flight_id, golfer.golfer")
		->from('flightmate')
		->join('golfer', 'flightmate.golfer_id = golfer.golfer_Id')
		->get()->result();*/
		$cur_date = date("Y-m-d");
		$course = '';
		if($params['course'] == 'p'){
			$course = 'Palmer';
		}else{
			$course = 'Nicklaus';
		}
		$q_flights = $this->db->query('SELECT DISTINCT flight_date, teetime, course FROM `flightmate` WHERE flight_date = CURRENT_DATE() AND course LIKE "%'.$course.'%" GROUP BY teetime, course ORDER BY teetime');
		$flights = $q_flights->result();
		/*$this->db->distinct("flightmate.flight_date, flightmate.teetime, flightmate.course");
		$this->db->from('flightmate');
		$this->db->where("flight_date", $cur_date);
		if($params['course'] == 'p'){		
			$this->db->owhere("course", "Palmer-1");
			$this->db->or_where("course", "Palmer-10");
		}else{			
			$this->db->where("course", "Nicklaus-1");
			$this->db->or_where("course", "Nicklaus-10");
		}
		$this->db->group_by('teetime', 'course');
		$this->db->order_by('teetime', 'ASC');
		$flights = $this->db->get()->result();*/

		$flight_mates = $this->db->select('flightmate.teetime, golfer.golfer, flightmate.course')
		->from('flightmate')
		->where("flight_date", $cur_date)
		->join('golfer', 'flightmate.golfer_id = golfer.golfer_Id')
		->get()->result();


		$cnt_f = 0;
		$cnt_fm = 0;
		
		foreach($flights as $f){
			$flightM = array();
			foreach($flight_mates as $fm){
				if($f->teetime == $fm->teetime && $f->course == $fm->course){
					array_push($flightM, $fm);
				}
			}
			$f->flightmates = $flightM;
		}

		
		/*foreach($flight_query as $f){
			$flightM = array();
			foreach($flightMates as $fm){
				if($f->flight_id == $fm->flight_id){
					array_push($flightM, $fm);
				}
			}
			$f->flightmates = $flightM;
		}*/

		//var_dump($flightMates);
		//exit();
		
		//return $flight_query;
		return $flights;
	}

	public function get_flights_on_booking($course_id)
	{
		$cur_date = date("Y-m-d");

		$this->db->where(array("teedate" => $cur_date, "course_id" => $course_id, "status" => "Confirmed"));
		$this->db->order_by("f9_starttime", "asc");
		
		$booking_query = $this->db->get("booking");
		
		return $booking_query->result();
	}

	public function get_settings($club_id)
	{
		$query = $this->db->where('theclub_id', $club_id)->get("theclub");
		return $query->row();
	}

	public function get_golfcourses(){
		$this->db->where("is_golfcourse", 1);
		$facility_query = $this->db->get("facility");
		
		return $facility_query->result();
	}
}