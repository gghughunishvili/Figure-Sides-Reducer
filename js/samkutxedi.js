function cosAlfa(x,y,z){
	return (x*x + y*y - z*z) / (2*x*y);
}

function sinAlfa(cosAlfa){
	return Math.sqrt(1-cosAlfa*cosAlfa);
}

function tanAlfa(sinAlfa,cosAlfa){
	return sinAlfa/cosAlfa;
}

function calculateSide(x1,y1,x2,y2){
	answer = Math.sqrt( Math.pow((x2-x1),2) + Math.pow((y2-y1),2) );
	return answer;
}

function calculateAnswer(a,b,c,reduceNumber){
	
	// ცდომილება მართი კუთხის შემთხვევაში
	eps = 0.000000001;

	//კოორდინატები: 0, 1
	x0 = 0; y0 = 0;
	x1 = c; y1 = 0;



	// x2, y2 კოორდინატების გამოთვლა
	cos_alfa3 = cosAlfa(a,c,b);
	sin_alfa3 = sinAlfa(cos_alfa3);



	// კოორდინატები: 2
	x2 = a*cos_alfa3; y2 = a*sin_alfa3;


	// მე-3 ღერძის წრფის მონაცემები
	k3 = 0;
	b3 = 0;


	// მე-2 ღერძის წრფის მონაცემები
	if (x2 == x1){
		calculateAnswer(a+eps,b+eps,c+eps,reduceNumber)
	}
	k2 = (y1-y2)/(x1-x2);
	b2 = y2 - k2*x2;



	// 1-ლი ღერძის წრფის მონაცემები
	if (x2 == x0){
		calculateAnswer(a+eps,b+eps,c+eps,reduceNumber)
	}
	k1 = (y2-y0)/(x2-x0);
	b1 = 0;


// --------------------------------------------------------------- \\

	// b3 პარამეტრის შეცვლა
	b3+=reduceNumber;



	// b2 პარამეტრის შეცვლა
	cos_alfa2 = (x2-x1)/b;
	b2+=reduceNumber/cos_alfa2;


	// b1 პარამეტრის შეცვლა
	cos_alfa1 = (x2-x0)/a;
	b1-=reduceNumber/cos_alfa1;



	//ახალი კოორდინატების დათვლა
	N_X2 = (b2-b1)/(k1-k2);
	N_Y2 = k1*N_X2 + b1;

	N_X1 = (b3-b2)/(k2-k3);
	N_Y1 = k2*N_X1 + b2;

	N_X0 = (b1-b3)/(k3-k1);
	N_Y0 = k3*N_X0 + b3;


	// ახალი გვერდების დათვლა
	N_a = calculateSide(N_X0, N_Y0, N_X2, N_Y2);
	N_b = calculateSide(N_X2, N_Y2, N_X1, N_Y1);
	N_c = calculateSide(N_X0, N_Y0, N_X1, N_Y1);

	$('#new_side_a').val(Math.round(N_a*100)/100);
	$('#new_side_b').val(Math.round(N_b*100)/100);
	$('#new_side_c').val(Math.round(N_c*100)/100);
}








$('#calculate').click(function(){

	a = $('#side_a').val(); //1
	b = $('#side_b').val(); //2 
	c = $('#side_c').val(); //3 

	reduceNumber = $('#reduceNumber').val();
	calculateAnswer(a,b,c,reduceNumber);
	

	$('.answer-wrapper').show();

});