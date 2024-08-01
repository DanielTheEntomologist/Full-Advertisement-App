// middleware to intercept response.send()
const filterCredentials = (req, res, next) => {
  // Storing the original send function
  const originalSend = res.send;

  // Override function
  res.send = function (body) {
    let modifiedBody = body;
    // Modify the response body
    if (typeof body === "string") {
      modifiedBody = modifiedBody.replace(
        /"password":\s*".*?"/g,
        '"password": "********"'
      );
      modifiedBody = modifiedBody.replace(
        /"salt":\s*".*?"/g,
        '"salt": "********"'
      );
    }

    // console.log("Intercepted response.send():", body);
    // console.log("Intercepted response.send():", Modifybody);

    // Calling the original send function
    originalSend.call(this, modifiedBody);
  };
  next();
};

exports.filterCredentials = filterCredentials;
