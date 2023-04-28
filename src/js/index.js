
let baseStyle = `
.rising-text {
	overflow: hidden;
	white-space: nowrap;
	text-align: center;
	height: fit-content;
	font-size: 2rem;
	font-family: "Roboto", sans-serif;
}
@keyframes rising-text {
	from {
		transform: translate3d(0, 25px, 0);
		opacity: 0;
	}
	to {
		transform: none;
		opacity: 1
	}
}
`

const style = document.createElement("style");
style.innerHTML = baseStyle;
document.head.appendChild(style);

document.querySelectorAll(".rising-text").forEach((v) => {
	let att = v.attributes;
	let type = att.getNamedItem("data-type").value;
	let activate = att.getNamedItem("data-activate").value;
	let duration = parseFloat(att.getNamedItem("data-duration").value) || 0.2;

	const types = ["word", "char"];
	if(!types.includes(type)) throw new Error("Invalid type");

	const activateTypes = ["hover", "click", "onload"];
	if(!activateTypes.includes(activate)) throw new Error("Invalid activate type");

	function animate() {
		if(type === "word") {
			const split = v.innerText.split(" ");
			style.innerHTML = baseStyle;

			split.forEach((e, i) => {
				style.innerHTML += `
					.rising-text-el:nth-child(${i + 1}) {
						animation-duration: ${(duration * i) + duration}s;
						animation-fill-name: both;
						animation-name: rising-text;
						display: inline-block;
					}
				`
				split[i] = `<span class="rising-text-el">${e}</span>`
			})

			v.innerHTML = split.join(" ");
		}
	}

	if(activate == "onload") {
		window.onload = animate();
	} else if(activate === "hover") {
		v.addEventListener("mouseenter", animate);
	} else if(activate === "click") {
		v.addEventListener("click", animate);
	}
})
