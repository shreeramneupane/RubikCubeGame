<?php
class dbconnect{
	public $dbhost = "localhost";
	public $dbuser = "root";
	public $dbpass = "";
	public $dbname = "bruik_game";
	public function __construct(){
		mysql_connect($this->dbhost, $this->dbuser, $this->dbpass);
		mysql_select_db($this->dbname);
	}
}

$objdbconnect = new dbconnect();

$score = $_GET['score'];
$sql = "select best_score from tbl_score where id = 1";
$result = mysql_query($sql);
$rows = mysql_num_rows($result);

if ($rows > 0){
	while ($data = mysql_fetch_assoc($result)){
		$bestScore = $data['best_score'];
	}
	if ($score > $bestScore){
		echo "Best Score in $bestScore movement completion";
	} else if ($score == $bestScore){
		echo "Draw with Best Score $bestScore";
	} else if ($score < $bestScore){
		echo "Beated Best Score $score";
		$sql = "UPDATE tbl_score SET best_score = $score where id = 1";
		mysql_query($sql);
	}
} else{
	$sql = "INSERT INTO tbl_score (best_score) VALUES ($score)";
	mysql_query($sql);
	echo "Congratulation you are first to win Bruik Game";
}
?>