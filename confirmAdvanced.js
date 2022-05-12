$(document).ready(function(){			
   // $('a.basic').confirmMailto();
//    Selects the a element with the class advanced.
    $('a.advanced').confirmMailto({
        // The initial message
        message: 	'Are you brave enough to send an email to $to? ',
        to: 		'html',
        // Color change on success
        success: 	function(){
                        $('a.advanced').css('color','#3C3');
                    },
        // Color change on fail
        fail: 		function(){
                        $('a.advanced').css('color','#F66');
                    },
        // Print different messages dependant on the result
        callback: 	function(result){
                        if(result){
                            alert('You are a brave humanoid!');
                        }else{
                            alert('And i thought you were brave...');
                        }
                    }
    });
});



