<?php

class search_filter {
      private $connect;
     	public function __construct()
	   	{
	   		if(isset($_GET))
	   		{
	   			 $rows = array();
	   			if($_GET['search'])
	   			{
	   				$search_item=$_GET['search'];
	   				$result_array=array();
	   				$sql="SELECT * FROM MOCK_DATA WHERE first_name LIKE '$search_item%'";
	   				$db=mysqli_connect("localhost", "root", "", "auto");
	   				$results=mysqli_query($db, $sql);
	   				$rows=array();
				   
					if(mysqli_num_rows($results)>0)
					{
							 while ($row = mysqli_fetch_assoc($results)) {
					        $rows[] = $row;
					    	}
					    print_r(json_encode($rows));
					}
					else 
					{
						$error_array=array("message"=>"Item canot be found");
						print_r(json_encode($error_array));
					}
	   			}
	   		}
	   	}
}

$search=new search_filter();
