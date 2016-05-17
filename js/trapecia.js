function cosAlfa(x,y,z){
	return (x*x + y*y - z*z) / (2*x*y);
}

function sCosAlfa(sinAlfa){
	return Math.sqrt(1-sinAlfa*sinAlfa);
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

function exactCoord(x1,x2,x3,b){
	t1 = b - (x1+x2+x3);
	t2 = b - (x1+x2-x3);
	t3 = b - (x1-x2-x3);
	t4 = b - (x1-x2+x3);

	console.log(x1);
	console.log(x2);
	console.log(x3);
	console.log(b);
	if ( (t1<t3 && t1<t4) || (t2<t3 && t2<t4) ){
		return x2;
	}else{
		return -x2;
	}
}

$('#calculate').click(function(){

	a = $('#side_a').val(); //1
	b = $('#side_b').val(); //2 
	c = $('#side_c').val(); //3 
	d = $('#side_d').val(); //4
	h = $('#side_e').val(); //5

	reduceNumber = $('#reduceNumber').val();

	//კოორდინატები
	x0 = 0; y0 = 0;
	x1 = d; y1 = 0;



	// x2, y2 კოორდინატების გამოთვლა
	sin_alfa3 = h/c;
	cos_alfa3 = sCosAlfa(sin_alfa3);
	



	// კოორდინატები გაურკვეველი ნიშნით
	x2 = c*cos_alfa3; y2 = h;



	// მე-4 ღერძის წრფის მონაცემები
	k4 = 0;
	b4 = 0;



	// x3, y3 კოორდინატების გამოთვლა
	sin_alfa1 = h/a;
	cos_alfa1 = sCosAlfa(sin_alfa1);



	// კოორდინატები გაურკვეველი ნიშნით
	x3 = a*cos_alfa1; y3 = h;


	//x2 ზუსტი კოორდინატი
	x2 = exactCoord(x1,x2,x3,b);


	//x3 ზუსტი კოორდინატი
	x3 = exactCoord(x1,x3,x2,b);


	// მე-3 ღერძის წრფის მონაცემები
	k3 = (y2-y1)/(x2-x1);
	b3 = y1 - k3*x1;


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