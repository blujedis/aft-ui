<script>import { fileInputDefaults as defaults } from "./module";
export let { name, readAs, onFormData, onReadFiles } = {
  ...defaults
};
let input;
function formData(files) {
  if (!files)
    return null;
  const data = input?.form instanceof HTMLFormElement ? new FormData(input?.form) : new FormData();
  Array.from(files).forEach((file) => data.append(name, file));
  return data;
}
function readFile(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
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
  files = files || input?.files;
  if (!files)
    return;
  if (typeof onReadFiles !== "undefined") {
    const proms = Array.from(files).map(readFile);
    Promise.all(proms).then((result) => {
      onReadFiles(null, result, files);
    }).catch((ex) => {
      onReadFiles(ex, null, files);
    });
  }
  if (typeof onFormData !== "undefined") {
    onFormData(formData(files), files);
  }
}
function handleInputChange(e) {
  handleFiles();
}
function handleDrop(e) {
  e.preventDefault();
  const files = e?.dataTransfer?.files;
  if (files)
    input.files = files;
  handleFiles(files);
}
function handleClick() {
  input.click();
}
</script>

<slot click={handleClick} drop={handleDrop} />

<slot name="input">
	<input
		{...$$restProps}
		bind:this={input}
		{name}
		on:change={handleInputChange}
		type="file"
		class="sr-only"
	/>
</slot>
