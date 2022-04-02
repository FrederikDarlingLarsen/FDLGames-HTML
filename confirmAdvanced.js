$(document).ready(function(){			
   // $('a.basic').confirmMailto();
    $('a.advanced').confirmMailto({
        message: 	'Are you brave enough to send an email to $to? ',
        to: 		'html',
        success: 	function(){
                        $('a.advanced').css('color','#3C3');
                    },
        fail: 		function(){
                        $('a.advanced').css('color','#F66');
                    },
        callback: 	function(result){
                        if(result){
                            alert('You are a brave humanoid!');
                        }else{
                            alert('And i thought you were brave...');
                        }
                    }
    });
});



