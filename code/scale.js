function createScale(scale, callback, w = width, name = scale.name, min = scale.min, max = scale.max, inc = scale.inc) {
	const container = document.createElement("div");
	container.className = `flex-container ${name.replace(/\d/, "")}`;
	container.style.width = `${w}px`;
	for (let i = min; i <= max; i += inc) {
		const div = document.createElement("div");
		const label = document.createElement("label");
		const input = document.createElement("input");
		const span = document.createElement("span");
		input.type = "radio";
		input.id = i;
		input.name = name;
		input.value = i;
		span.innerHTML += i;
		span.addEventListener("click", label.click);
		span.className = `${name.replace(/\d/, "")}Checkmark`;
		label.className = `${name.replace(/\d/, "")}Container`;
		label.appendChild(input);
		label.appendChild(span);
		label.addEventListener("change", () => setTimeout(callback, 500));
		div.appendChild(label);
		container.appendChild(div);
	}
	for (const child of container.childNodes)
		child.style.width = `${w / container.childElementCount}px`;
	return container;
}

function labelScale(labels, w = width) {
	const container = document.createElement("div");
	container.className = "flex-container label";
	container.style.width = `${w}px`;
	for (const label of labels) {
		const div = document.createElement("div");
		div.innerText = label;
		if (label == labels[0]) div.style.textAlign = "left";
		if (label == labels[labels.length - 1]) div.style.textAlign = "right";
		container.appendChild(div);
	}
	for (const child of container.childNodes)
		child.style.width = `${w / container.childElementCount}px`;
	return container;
}