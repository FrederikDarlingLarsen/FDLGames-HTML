
$(document).ready(function(){			
   // $('a.basic').confirmMailto();
    $('a.advanced').confirmMailto({
        message: 	'Are you cool enough to send an email to $to? ',
        to: 		'html',
        success: 	function(){
                        $('a.advanced').css('color','#3C3');
                    },
        fail: 		function(){
                        $('a.advanced').css('color','#F66');
                    },
        callback: 	function(result){
                        if(result){
                            alert('Thank you!');
                        }else{
                            alert('Boooo!');
                        }
                    }
    });
});