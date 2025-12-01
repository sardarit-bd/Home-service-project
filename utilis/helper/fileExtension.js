function FileExtension(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    return extension;
}

export default FileExtension;