import Axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { proxy } from '../config';



export const employeeData = function (callback) {
    const token = JSON.parse(reactLocalStorage.get('token', { token: 'token' })).token;

    Axios({
        method: 'get',
        url: `${proxy}/employee`,
        headers: {
            authorization: token,
        },
    })
        .then((res) => {
            const employees = res.data.data;
            return callback(employees);
        })
        .catch((err) => {
            if (err.response) {
                return callback(err.response);
            }
        });
};

export const sendEmployeeInfo =function (employee,callback) {
    const token = JSON.parse(reactLocalStorage.get('token', {'token': 'token'})).token;
    Axios({
        method: 'post',
        url: `${proxy}/employee`,
        headers: {
            authorization: token
        },
        data: {
            firstname: employee.firstname,
            middlename: employee.middlename,
            lastname: employee.lastname,
            email: employee.email,
            code: employee.codeno,
            password: employee.password,
            roleId: employee.role,
            designationId: employee.designation,
            departmentId: employee.department,
            mobile: employee.mobile
        }
    })
        .then(res => {
            return callback(res)
        })
        .catch(err => {
            if (err.response) {
                return callback(err.response)
            }
        });
};


export const updateEmployee = function (employee, callback) {
    const token = JSON.parse(reactLocalStorage.get('token', {'token': 'token'})).token
    const id = JSON.parse(reactLocalStorage.get('token', {'id': 'id'})).id;
    
    Axios({
        method: 'put',
        url: `${proxy}/employee/${id}`,
        headers: {
            authorization: token
        },
        data: {
            firstname: employee.firstname,
            middlename: employee.middlename,
            lastname: employee.lastname,
            birthdate: employee.birthdate,
            mobile: employee.mobile,
            picture: 'employee.picture',
            email: employee.email,
            password: employee.password,
            experience: employee.experience,
            expertise: employee.expertise,
            designationId: employee.designation,
            departmentId: employee.department
        }
    })
        .then(res => callback(res))
        .catch(err => callback(err));
};

export const getEmployeeById = function (callback) {
    try {
        const token = JSON.parse(reactLocalStorage.get('token', {'token': 'token'})).token;
        const id = JSON.parse(reactLocalStorage.get('token', {'id': 'id'})).id;

        Axios({
            method: "get",
            url: `${proxy}/employee/${id}`,
            headers: {
                authorization: token
            }
        })
            .then(res => {
                let employees = res.data.data;
                return callback(employees)
            })
            .catch(err => {
                if (err.response) {
                    return callback(err.response)
                }
            })
    }
    catch (err) {
        return callback(err)
    }
};