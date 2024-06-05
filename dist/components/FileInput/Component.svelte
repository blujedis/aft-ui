<script>import { fileInputDefaults as defaults } from "./module";
export let { name, readAs, state, onFormData, onReadFiles } = {
  ...defaults
};
let input;
function createFormData(files) {
  const data = input?.form instanceof HTMLFormElement ? new FormData(input?.form) : new FormData();
  Array.from(files).forEach((file) => data.append(name, file));
  return data;
}
function readFile(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    if (readAs === "text")
      reader.readAsText(file);
    else if (readAs === "url")
      reader.readAsDataURL(file);
    else if (readAs === "binary")
      reader.readAsBinaryString(file);
    else
      reader.readAsArrayBuffer(file);
  });
}
function handleFiles(files) {
  files = input.files;
  if (typeof onReadFiles !== "undefined") {
    const proms = Array.from(files).map(readFile);
    Promise.all(proms).then((result) => {
      state = 2;
      Promise.resolve(onReadFiles(null, result, files)).then((valid) => {
        if (valid === false)
          state = 3;
      });
    }).catch((ex) => {
      state = 3;
      onReadFiles(ex, null, files);
    });
  } else if (typeof onFormData !== "undefined") {
    try {
      state = 2;
      Promise.resolve(
        onFormData(null, createFormData(files), files)
      ).then((valid) => {
        if (valid === false)
          state = 3;
      });
    } catch (ex) {
      state = 3;
      onFormData(ex, null, files);
    }
  }
}
function handleInputChange(e) {
  handleFiles(null);
}
function handleDrop(e) {
  e.preventDefault();
  const files = e?.dataTransfer?.files;
  if (files)
    input.files = files;
  handleFiles(files);
}
function handleDragOver(e) {
  e.preventDefault();
  state = 1;
}
function handleDragEnd(e) {
  state = 0;
}
function handleClick(e) {
  e.preventDefault();
  state = 0;
  input.click();
}
</script>

<slot
	{input}
	{state}
	onClick={handleClick}
	onDrop={handleDrop}
	onDragOver={handleDragOver}
	onDragEnd={handleDragEnd}
	onDragLeave={handleDragEnd}
/>
<input
	bind:this={input}
	{...$$restProps}
	{name}
	type="file"
	class="sr-only"
	on:change={handleInputChange}
/>
