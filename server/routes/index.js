var express = require('express'); 
var router = express.Router(); 
 
const authRoutes = require('../services/auth/auth.route'); 
const employeeRoutes = require('../services/employee/employee.route'); 
const departmentRoutes = require('../services/department/department.route'); 
const roleRoutes = require('../services/role/role.route'); 
const designationRoutes = require('../services/designation/designation.route'); 
const expertiseRoutes = require('../services/expertise/expertise.route'); 
const employeeExpertiseRoutes = require('../services/empExpertise/empExpertise.route'); 
const candidateExpertiseRoutes = require('../services/canExpertise/canExpertise.route'); 
const candidateRoutes = require('../services/candidate/candidate.route');  
const mailRoutes = require('../services/mail/mail.route');
const signedUrlRoute = require('../services/google-cloud-storage/signedUrl.route');

router.route('/') 
  .get((request, response) => { 
    response.status(204).send(); 
}); 
 
router.use('/auth', authRoutes); 
router.use('/employee', employeeRoutes); 
router.use('/candidate', candidateRoutes);  
router.use('/department', departmentRoutes); 
router.use('/role', roleRoutes); 
router.use('/designation', designationRoutes); 
router.use('/expertise', expertiseRoutes); 
router.use('/empExpertise', employeeExpertiseRoutes); 
router.use('/canExpertise', candidateExpertiseRoutes); 
router.use('/signedUrl', signedUrlRoute);
router.use('/mail', mailRoutes); 

module.exports = router; 
