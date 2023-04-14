// Work in progress needs to be optimized

// Get Sliders / Input  by ID
let sliderOne = document.getElementById("one");
let sliderTwo = document.getElementById("two");
let sliderThree = document.getElementById("three");
let sliderFour = document.getElementById("four");
let sliderFive = document.getElementById("five");
let sliderSix = document.getElementById("six");
let opacityOne = document.getElementById("opacity_one");
let opacityTwo = document.getElementById("opacity_two");
let start = document.getElementById("start");
let end = document.getElementById("end");
let deg = document.getElementById("deg");
let color = document.getElementById("colorSelect");
let fontSize = document.getElementById("fontSize");
let blendMode = document.getElementById("mixBlend");
let imgURL = document.getElementById("urlInput");
let animation = document.getElementById("speed");
let transition = document.getElementById("transition");

//Get Span by ID
let oneValue = document.getElementById("one_value");
let twoValue = document.getElementById("two_value");
let threeValue = document.getElementById("three_value");
let fourValue = document.getElementById("four_value");
let fiveValue = document.getElementById("five_value");
let sixValue = document.getElementById("six_value");
let opacityOneValue = document.getElementById("opacity_one_value");
let opacityTwoValue = document.getElementById("opacity_two_value");
let startValue = document.getElementById("start_value");
let endValue = document.getElementById("end_value");
let degValue = document.getElementById("deg_value");
let fontSizeValue = document.getElementById("font_value");
let animationValue = document.getElementById("speed_value");

// Get root variables and values
let root = document.documentElement;
oneValue.innerHTML = sliderOne.value;
twoValue.innerHTML = sliderTwo.value;
threeValue.innerHTML = sliderThree.value;
fourValue.innerHTML = sliderFour.value;
fiveValue.innerHTML = sliderFive.value;
sixValue.innerHTML = sliderSix.value;
opacityOneValue.innerHTML = opacityOne.value;
opacityTwoValue.innerHtml = opacityTwo.value;
startValue.innerHTML = opacityTwo.value;
endValue.innerHTML = opacityOne.value;
degValue.innerHTML = deg.value;
fontSize.innerHTML = fontSizeValue.value;
animationValue.innerHTML = animation.value;

// Check for User Input and Update var in CSS root and Span
sliderOne.oninput = function () {
	oneValue.innerHTML = this.value;
	root.style.setProperty("--color_one_rgb", sliderOne.value);
};

sliderTwo.oninput = function () {
	twoValue.innerHTML = this.value;
	root.style.setProperty("--color_two_rgb", sliderTwo.value);
};

sliderThree.oninput = function () {
	threeValue.innerHTML = this.value;
	root.style.setProperty("--color_three_rgb", sliderThree.value);
};

sliderFour.oninput = function () {
	fourValue.innerHTML = this.value;
	root.style.setProperty("--color_four_rgb", sliderFour.value);
};

sliderFive.oninput = function () {
	fiveValue.innerHTML = this.value;
	root.style.setProperty("--color_five_rgb", sliderFive.value);
};

sliderSix.oninput = function () {
	sixValue.innerHTML = this.value;
	root.style.setProperty("--color_six_rgb", sliderSix.value);
};

opacityOne.oninput = function () {
	opacityOneValue.innerHTML = this.value;
	root.style.setProperty("--color_one_opacity", opacityOne.value);
};

opacityTwo.oninput = function () {
	opacityTwoValue.innerHTML = this.value;
	root.style.setProperty("--color_two_opacity", opacityTwo.value);
};

start.oninput = function () {
	startValue.innerHTML = this.value + "%";
	root.style.setProperty("--start", start.value + "%");
};

end.oninput = function () {
	endValue.innerHTML = this.value + "%";
	root.style.setProperty("--end", end.value + "%");
};

deg.oninput = function () {
	degValue.innerHTML = this.value + "deg";
	root.style.setProperty("--linear-deg", deg.value + "deg");
};

color.oninput = function () {
	root.style.setProperty("--font-color", color.value);
};

fontSize.oninput = function () {
	fontSizeValue.innerHTML = this.value + "vw";
	root.style.setProperty("--font-size", fontSize.value + "vw");
};

blendMode.oninput = function () {
	root.style.setProperty("--blend-mode", blendMode.value);
};

imgURL.oninput = function () {
	root.style.setProperty("--url", "url" + "(" + "'" + imgURL.value + "'" + ")");
	console.log(imgURL.value);
};

animation.oninput = function () {
	animationValue.innerHTML = this.value + "s";
	root.style.setProperty("--animation-speed", animation.value + "s");
};

transition.oninput = function () {
	root.style.setProperty("--transition", transition.value);
};