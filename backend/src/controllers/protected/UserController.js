const jwt = require('jsonwebtoken');
const fs = require('fs');
const handlebars = require('handlebars');
const { Readable } = require('stream');
const User = require('../../models/User');
const { CustomError, ErrorHandler, ResponseHandler } = require('../../utils/responseHandler');
const Permission = require('../../models/Permission');
const Role = require('../../models/Role');
const bcrypt = require('bcrypt');
const { HTTP_STATUS_CODES } = require('../../constants/error_message_codes');
const sendMail = require('../../utils/sendMail');
const { generateRandomString } = require('../auth/authController');
const path = require('path');
const Sidebar = require('../../models/Sidebar');
const AuthValidator = require('../../validator/AuthValidator');
const cloudinary = require('../../config/cloudinary');


const defaultSidebarJson = {
  "comman": [
    {
      "id": "7dg9i97e9",
      "imgURL": "dashboard",
      "route": "/dashboard",
      "label": "Dashboard",
      "subcategory": []
    },
  ],
  "websites": {
  }
}

const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId).populate('role').populate('permissions');
    if (!user) {
      throw new CustomError(404, 'User not found');
    }


    const userProfile = {
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      bio: user.bio,
      profile_pic: user.profile_pic,
      lastName: user.lastName,
      role: user.role?.name,
      permissions: user.permissions,
      isEmailVerified: user?.isEmailVerified,
      temp_email: user?.temp_email

    };

    ResponseHandler.success(res, userProfile, 200);
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }
    user.staySignedIn = false;
    user.save();

    ResponseHandler.success(res, 200);
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

const sendOtpVerificationOnEmail = async (req, res) => {
  try {
    const { email, form_type, verification_code } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    // Generate OTP here
    const otp = generateRandomString(6); // You need to implement generateOTP function

    if (form_type == 'send_mail') {
      try {
        const templateFilePath = path.join(__dirname, '..', '..', 'email-templates', 'send-email-verification.hbs');
        const templateFile = fs.readFileSync(templateFilePath, 'utf8');
        const template = handlebars.compile(templateFile);
        const app_logo = `${process.env.APP_LOGO_PATH}`
        const app_name = process.env.APP_NAME;
        const verificationLink = `${process.env.FRONTEND_APP_URL}verify-email/${encodeURIComponent(otp)}/${encodeURIComponent(user._id)}/${btoa(email)}`;


        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Account Verification Email',
          html: template({ app_logo, app_name, verificationLink })
        };

        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY_DURATION));
        user.isEmailVerified = false;
        user.temp_email = email;
        await user.save();

        // Send email
        sendMail(mailOptions)
          .then(async () => {
            ResponseHandler.success(res, { email_sent: true, otp: otp, message: "Verification code sent successfully" }, HTTP_STATUS_CODES.OK);
          })
          .catch((error) => {
            ResponseHandler.error(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, { field_error: 'email', email_sent: false, message: "Failed to send verification code" }, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
          });
      } catch (error) {
        ErrorHandler.handleError(error, res);
      }
    } else {
      if (verification_code !== user.otp) {
        ResponseHandler.error(res, HTTP_STATUS_CODES.UNAUTHORIZED, { field_error: 'verification_code', message: "Invalid or expired verification code. Please verify your email again!" }, HTTP_STATUS_CODES.UNAUTHORIZED); return;
      } else {
        user.otp = otp;
        user.save();
        ResponseHandler.success(res, { verified: true, message: "Email verified successfully" }, HTTP_STATUS_CODES.OK);
      }
    }

  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

const checkPassword = async (req, res) => {
  try {
    const { password } = req.body; // Assuming the password is sent in the request body

    // Extracting the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      ResponseHandler.error(res, HTTP_STATUS_CODES.UNAUTHORIZED, { field_error: 'password', message: "Your password seems incorrect! Please try again." }, HTTP_STATUS_CODES.UNAUTHORIZED); return;
    }

    // If passwords match, return a success response
    ResponseHandler.success(res, { message: 'Password is correct' }, 200);
  } catch (error) {
    // Handle errors
    ErrorHandler.handleError(error, res);
  }
};

const saveSidebarData = async (req, res) => {
  try {
    const jsonData = req.body;
    const jsonString = JSON.stringify(jsonData, null, 2);
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Check if a sidebar with the same userId exists
    const existingSidebar = await Sidebar.findOne({ userId });

    if (existingSidebar) {
      // If sidebar with same userId exists, update its items
      existingSidebar.items = jsonString;
      await existingSidebar.save();

      ResponseHandler.success(res, { message: 'Sidebar Updated Successfully', sidebar: JSON.parse(existingSidebar.items[0]) }, HTTP_STATUS_CODES.OK);
    } else {
      // If sidebar with userId doesn't exist, create a new sidebar object
      const sidebar = new Sidebar({
        userId: userId,
        items: jsonString
      });

      // Save the Sidebar object to the database
      await sidebar.save();

      ResponseHandler.success(res, { message: 'Sidebar Created Successfully', sidebar: JSON.parse(sidebar.items[0]) }, HTTP_STATUS_CODES.CREATED);
    }
  } catch (error) {
    ResponseHandler.error(res, HTTP_STATUS_CODES.BAD_REQUEST, error.message, HTTP_STATUS_CODES.BAD_REQUEST);
  }
};


const getSidebarData = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    let sidebar = await Sidebar.findOne({ userId });
    if (sidebar == null || sidebar == '') {
      sidebar = defaultSidebarJson;
    }

    ResponseHandler.success(res, { sidebar }, HTTP_STATUS_CODES.OK);
  } catch (error) {
    // Handle errors
    console.error('Error fetching sidebar data:', error);
    ResponseHandler.error(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal server error', HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
};


const cancelEmailChangeRequest = async (req, res) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    user.isEmailVerified = true;
    user.temp_email = '';
    await user.save();
    // If passwords match, return a success response
    ResponseHandler.success(res, { message: 'Email Change request has been cancelled successfully!' }, 200);
  } catch (error) {
    // Handle errors
    ErrorHandler.handleError(error, res);
  }
};


const createOrEditUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const created_by = decodedToken.userId;
    const userRole = await Role.findOne({ name: 'user' });

    AuthValidator.validateRegistration(req.body.user);
    const { username, password, email, firstName, lastName, id, profile_pic, permissions } = req.body.user;
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (id) {
      // Edit user if id is provided
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return ResponseHandler.error(res, { message: 'User not found' }, HTTP_STATUS_CODES.NOT_FOUND);
      }

      // Update the user fields
      existingUser.username = username;
      if (hashedPassword) existingUser.password = hashedPassword;
      existingUser.email = email;
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.role = userRole._id;
      existingUser.permissions =permissions;
      if (profile_pic == '') {
        existingUser.profile_pic = profile_pic;
      }

      if (profile_pic) {
        const base64String = profile_pic;
        const buffer = Buffer.from(base64String, 'base64');
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);

        // Upload the profile picture to cloudinary
        const uploadPromise = new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream({ folder: 'profile_pictures' },
            (error, result) => {
              if (error) {
                console.error('Upload error:', error);
                reject(error);
              } else {
                existingUser.profile_pic = result.secure_url;
                console.log('Uploaded profile pic:', result.secure_url);
                resolve();
              }
            }
          );

          readableStream.pipe(uploadStream);
        });

        await uploadPromise;
      }

      await existingUser.save();
      ResponseHandler.success(res, { message: 'User updated successfully' }, HTTP_STATUS_CODES.OK);
    } else {
      // Create new user if id is not provided
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        permissions,
        role: userRole, 
        created_by
      });

      // Save the user
      await newUser.save();

      // Handle profile picture upload
      if (profile_pic) {
        const base64String = profile_pic;
        const buffer = Buffer.from(base64String, 'base64');
        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);

        // Upload the profile picture to cloudinary
        const uploadPromise = new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream({ folder: 'profile_pictures' },
            (error, result) => {
              if (error) {
                console.error('Upload error:', error);
                reject(error);
              } else {
                if (id) {

                }
                newUser.profile_pic = result.secure_url;
                console.log('Uploaded profile pic:', result.secure_url);
                resolve();
              }
            }
          );

          readableStream.pipe(uploadStream);
        });

        await uploadPromise;
        await newUser.save(); // Save the user with the updated profile picture
      }

      ResponseHandler.success(res, { message: 'User created successfully' }, HTTP_STATUS_CODES.OK);
    }
  } catch (error) {
    // Handle errors
    ErrorHandler.handleError(error, res);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = req.params.user_id;
    const user = await User.findById(userId).populate('role');
    if (!user) {
      throw new CustomError(404, 'User not found');
    }


    const userProfile = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      bio: user.bio,
      profile_pic: user.profile_pic,
      lastName: user.lastName,
      role: user.role?.name,
      permissions: user?.permissions,
      isEmailVerified: user?.isEmailVerified,
      temp_email: user?.temp_email

    };

    ResponseHandler.success(res, userProfile, 200);
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};

const getAllUser = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, filterBy } = req.query;

    const query = {};
    if (search) {
      query.username = { $regex: new RegExp(search, 'i') };
    }
    // Add more conditions for filtering if needed

    const users = await User.find(query)
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .skip((page - 1) * limit)
      .populate('role')
      .limit(Number(limit));

    // Simulate pagination metadata
    const totalDocuments = await User.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);

    const userData = users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      bio: user.bio,
      profile_pic: user.profile_pic,
      lastName: user.lastName,
      role: user?.role?.name,
      status : user?.status || 'active',
      permissions: user.permissions,
      isEmailVerified: user?.isEmailVerified,
      temp_email: user?.temp_email
    }));

    const paginationInfo = {
      page: Number(page),
      limit: Number(limit),
      totalPages,
      totalItems: totalDocuments,
    };

    // Return the user data and pagination information
    ResponseHandler.success(res, { userData, pagination: paginationInfo }, 200);
  } catch (error) {
    ErrorHandler.handleError(error, res);
  }
};





module.exports = {
  getProfile, checkPassword, sendOtpVerificationOnEmail, logout, getSidebarData, saveSidebarData, cancelEmailChangeRequest, createOrEditUser, getUserProfile, getAllUser
};
