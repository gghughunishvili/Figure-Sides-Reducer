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

function cosAlfaPlusBeta(cos_alfa,cos_beta){
	sin_alfa = sinAlfa(cos_alfa);
	sin_beta = sinAlfa(cos_beta);

	return cos_alfa * cos_beta - sin_alfa * sin_beta;
}

function calculateAnswer(a,b,c,d,e,reduceNumber){
	
	// ცდომილება მართი კუთხის შემთხვევაში
	eps = 0.000000001;


	//კოორდინატები: 0, 1
	x0 = 0; y0 = 0;
	x1 = d; y1 = 0;



	// x2, y2 კოორდინატების გამოთვლა
	cos_alfa3 = cosAlfa(e,d,c);
	sin_alfa3 = sinAlfa(cos_alfa3);



	// კოორდინატები: 2
	x2 = e*cos_alfa3; y2 = e*sin_alfa3;



	// x3, y3 კოორდინატების გამოთვლა
	cos_alfa = cos_alfa3;
	cos_beta = cosAlfa(a,e,b);
	cos_alfa_plus_beta = cosAlfaPlusBeta(cos_alfa, cos_beta);



	// კოორდინატები: 3
	x3 = a * cos_alfa_plus_beta; y3 = a * sinAlfa(cos_alfa_plus_beta);


	// მე-4 ღერძის წრფის მონაცემები
	k4 = 0;
	b4 = 0;


	// მე-3 ღერძის წრფის მონაცემები
	if (x2 == x1){
		calculateAnswer(a+eps,b+eps,c+eps,d+eps,e+eps,reduceNumber)
	}
	k3 = (y2-y1)/(x2-x1);
	b3 = y2 - k3*x2;


	// მე-2 ღერძის წრფის მონაცემები
	if (x2 == x3){
		calculateAnswer(a+eps,b+eps,c+eps,d+eps,e+eps,reduceNumber)
	}
	k2 = (y3-y2)/(x3-x2);
	b2 = y3 - k2*x3;



	// 1-ლი ღერძის წრფის მონაცემები
	if (x3 == x0){
		calculateAnswer(a+eps,b+eps,c+eps,d+eps,e+eps,reduceNumber)
	}
	k1 = (y3-y0)/(x3-x0);
	b1 = 0;


// --------------------------------------------------------------- \\


	// b4 პარამეტრის შეცვლა
	b4+=reduceNumber;



	// b3 პარამეტრის შეცვლა
	cos_alfa3 = (x2-x1)/c;
	b3+=reduceNumber/cos_alfa3;



	// b2 პარამეტრის შეცვლა
	cos_alfa2 = (x2-x3)/b;
	b2-=reduceNumber/Math.abs(cos_alfa2);



	// b1 პარამეტრის შეცვლა
	cos_alfa1 = (x0-x3)/a;
	b1+=reduceNumber/cos_alfa1;



	//ახალი კოორდინატების დათვლა
	N_X3 = (b2-b1)/(k1-k2);
	N_Y3 = k1*N_X3 + b1;

	N_X2 = (b3-b2)/(k2-k3);
	N_Y2 = k2*N_X2 + b2;

	N_X1 = (b3-b4)/(k4-k3);
	N_Y1 = k3*N_X1 + b3;

	N_X0 = (b1-b4)/(k4-k1);
	N_Y0 = k4*N_X0 + b4;


	// ახალი გვერდების დათვლა
	N_a = calculateSide(N_X0, N_Y0, N_X3, N_Y3);
	N_b = calculateSide(N_X2, N_Y2, N_X3, N_Y3);
	N_c = calculateSide(N_X2, N_Y2, N_X1, N_Y1);
	N_d = calculateSide(N_X1, N_Y1, N_X0, N_Y0);
	N_e = calculateSide(N_X2, N_Y2, N_X0, N_Y0);
	N_f = calculateSide(N_X1, N_Y1, N_X3, N_Y3);

	$('#new_side_a').val(Math.round(N_a*100)/100);
	$('#new_side_b').val(Math.round(N_b*100)/100);
	$('#new_side_c').val(Math.round(N_c*100)/100);
	$('#new_side_d').val(Math.round(N_d*100)/100);
	$('#new_side_e').val(Math.round(N_e*100)/100);
	$('#new_side_f').val(Math.round(N_f*100)/100);
}








$('#calculate').click(function(){

	a = $('#side_a').val(); //1
	b = $('#side_b').val(); //2 
	c = $('#side_c').val(); //3 
	d = $('#side_d').val(); //4
	e = $('#side_e').val(); //5

	reduceNumber = $('#reduceNumber').val();
	calculateAnswer(a,b,c,d,e,reduceNumber);
	

	$('.answer-wrapper').show();

});