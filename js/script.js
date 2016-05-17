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

$('#calculate').click(function(){

	a = $('#side_a').val(); //1
	b = $('#side_b').val(); //2 
	c = $('#side_c').val(); //3 
	d = $('#side_d').val(); //4
	e = $('#side_e').val(); //5
	f = $('#side_f').val(); //6

	reduceNumber = $('#reduceNumber').val();
	
	//a = 108;
	//b = 96;
	//c = 108.5;
	//d = 106.5;
	//e = 145;
	//f = 151;
	//reduceNumber = 0.5;

	//კოორდინატები
	x0 = 0; y0 = 0;
	x1 = d; y1 = 0;



	// x2, y2 კოორდინატების გამოთვლა
	cos_alfa3 = cosAlfa(e,d,c);
	sin_alfa3 = sinAlfa(cos_alfa3);



	// კოორდინატები
	x2 = e*cos_alfa3; y2 = e*sin_alfa3;



	// მე-3 ღერძის წრფის მონაცემები
	k3 = (y2-y1)/(x2-x1);
	b3 = y1 - k3*x1;



	// მე-4 ღერძის წრფის მონაცემები
	k4 = 0;
	b4 = 0;



	// x3, y3 კოორდინატების გამოთვლა
	cos_alfa1 = cosAlfa(f,d,a);
	sin_alfa1 = sinAlfa(cos_alfa1);



	// კოორდინატები
	x3 =x1 - f*cos_alfa1; y3 = f*sin_alfa1;



	// 1-ლი ღერძის წრფის მონაცემები
	k1 = (y3-y0)/(x3-x0);
	b1 = y3 - k1*x3;



	// მე-2 ღერძის წრფის მონაცემები
	k2 = (y2-y3)/(x2-x3);
	b2 = y3 - k2*x3;



	// b4 პარამეტრის შეცვლა
	b4+=reduceNumber;



	// b3 პარამეტრის შეცვლა
	cos_alfa5 = (x2-x1)/c;
	b3+=reduceNumber/cos_alfa5;



	// b2 პარამეტრის შეცვლა
	cos_alfa2 = (x2-x3)/b;
	b2-=reduceNumber/Math.abs(cos_alfa2);



	// b1 პარამეტრის შეცვლა
	cos_alfa6 = (x0-x3)/a;
	b1+=reduceNumber/cos_alfa6;



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

	$('#new_side_a').val(N_a);
	$('#new_side_b').val(N_b);
	$('#new_side_c').val(N_c);
	$('#new_side_d').val(N_d);
	$('#new_side_e').val(N_e);
	$('#new_side_f').val(N_f);

	$('.answer-wrapper').show();

	// DONE DONE DONE DONE DONE DONE DONE DONE DONE

});