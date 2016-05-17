function cosAlfa(x,y,z){
	return (x*x + y*y - z*z) / (2*x*y);
}

function sinAlfa(cosAlfa){
	return Math.sqrt(1-cosAlfa*cosAlfa);
}

function cosTheory(a,b,cosAlfa){
	return Math.sqrt(a*a+b*b - 2*a*b*cosAlfa);
}

function tanAlfa(sinAlfa,cosAlfa){
	return sinAlfa/cosAlfa;
}

function calculateSide(x1,y1,x2,y2){
	var answer = Math.sqrt( Math.pow((x2-x1),2) + Math.pow((y2-y1),2) );
	return answer;
}

function cosAlfaPlusBeta(cos_alfa,cos_beta){
	var sin_alfa = sinAlfa(cos_alfa);
	var sin_beta = sinAlfa(cos_beta);

	return cos_alfa * cos_beta - sin_alfa * sin_beta;
}

function calculateAnswer(a,b,c,d,e,f,g,reduceNumber){
	
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



	// x4, y4 კოორდინატების გამოთვლა
	cos_alfa4 = cosAlfa(e,c,d);
	cos_alfa7 = cosAlfa(c,f,g);
	cos_alfa_plus_beta2 = cosAlfaPlusBeta(cos_alfa4, cos_alfa7);

	h = cosTheory(e,f, cos_alfa_plus_beta2);
	cos_beta7 = cosAlfa(h,d,g);



	// კოორდინატები: 4
	x4 = h * cos_beta7; y4 = h * sinAlfa(cos_beta7);


	// მე-7 ღერძის წრფის მონაცემები
	k7 = (y1-y4)/(x1-x4);
	b7 = y1 - k7*x1;


	// მე-6 ღერძის წრფის მონაცემები
	k6 = (y2-y4)/(x2-x4);
	b6 = y2 - k6*x2;



	// მე-4 ღერძის წრფის მონაცემები
	k4 = 0;
	b4 = 0;



	// მე-2 ღერძის წრფის მონაცემები
	k2 = (y3-y2)/(x3-x2);
	b2 = y3 - k2*x3;



	// 1-ლი ღერძის წრფის მონაცემები
	k1 = (y3-y0)/(x3-x0);
	b1 = 0;


// --------------------------------------------------------------- \\


	// b7 პარამეტრის შეცვლა
	cos_gama7 = (x4-x1)/g;
	b7+=reduceNumber/cos_gama7;

	// b6 პარამეტრის შეცვლა
	cos_gama6 = (x2-x4)/f;
	b6+=reduceNumber/cos_gama6;


	// b4 პარამეტრის შეცვლა
	b4+=reduceNumber;


	// b2 პარამეტრის შეცვლა
	cos_alfa2 = (x2-x3)/b;
	b2-=reduceNumber/Math.abs(cos_alfa2);



	// b1 პარამეტრის შეცვლა
	cos_alfa1 = (x0-x3)/a;
	b1+=reduceNumber/cos_alfa1;



	//ახალი კოორდინატების დათვლა
	N_X4 = (b7-b6)/(k6-k7);
	N_Y4 = k7*N_X4 + b7;

	N_X3 = (b2-b1)/(k1-k2);
	N_Y3 = k1*N_X3 + b1;

	N_X2 = (b6-b2)/(k2-k6);
	N_Y2 = k2*N_X2 + b2;

	N_X1 = (b7-b4)/(k4-k7);
	N_Y1 = k7*N_X1 + b7;

	N_X0 = (b1-b4)/(k4-k1);
	N_Y0 = k4*N_X0 + b4;


	// ახალი გვერდების დათვლა
	N_a = calculateSide(N_X0, N_Y0, N_X3, N_Y3);
	N_b = calculateSide(N_X2, N_Y2, N_X3, N_Y3);
	N_c = calculateSide(N_X2, N_Y2, N_X1, N_Y1);
	N_d = calculateSide(N_X1, N_Y1, N_X0, N_Y0);
	N_e = calculateSide(N_X2, N_Y2, N_X0, N_Y0);
	N_f = calculateSide(N_X2, N_Y2, N_X4, N_Y4);
	N_g = calculateSide(N_X1, N_Y1, N_X4, N_Y4);
	N_h = calculateSide(N_X0, N_Y0, N_X4, N_Y4);
	N_i = calculateSide(N_X3, N_Y3, N_X1, N_Y1);

	$('#new_side_a').val(Math.round(N_a*100)/100);
	$('#new_side_b').val(Math.round(N_b*100)/100);
	$('#new_side_c').val(Math.round(N_c*100)/100);
	$('#new_side_d').val(Math.round(N_d*100)/100);
	$('#new_side_e').val(Math.round(N_e*100)/100);
	$('#new_side_f').val(Math.round(N_f*100)/100);
	$('#new_side_g').val(Math.round(N_g*100)/100);
	$('#new_side_h').val(Math.round(N_h*100)/100);
	$('#new_side_i').val(Math.round(N_i*100)/100);
}

/*

var a=107;
var b=95.54;
var c=143.12;

cos_alfa0 = cosAlfa(b,c,a);
sin_alfa0 = sinAlfa(cos_alfa0);

var d=107.5;
var e=105.65;

cos_beta0 = cosAlfa(c,d,e);
sin_beta0 = sinAlfa(cos_beta0);

cos_alfa_x = cos_alfa0*cos_beta0 - sin_alfa0*sin_beta0;

var x = cosTheory(b,d,cos_alfa_x);

alert(x);

*/







$('#calculate').click(function(){

	a = $('#side_a').val(); //1
	b = $('#side_b').val(); //2 
	c = $('#side_c').val(); //3 
	d = $('#side_d').val(); //4
	e = $('#side_e').val(); //5
	f = $('#side_f').val(); //6
	g = $('#side_g').val(); //7

	reduceNumber = $('#reduceNumber').val();
	calculateAnswer(a,b,c,d,e,f,g,reduceNumber);
	

	$('.answer-wrapper').show();

});