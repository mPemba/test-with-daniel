"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor() {
        this.users = [
            {
                id: '123',
                email: 'existingemail@gmail.com',
                username: 'existingusername',
                password: 'password',
            },
        ];
        this.validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };
    }
    async hashPassword(password) {
        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }
    async checkEmail(email) {
        if (!this.validateEmail(email.toLowerCase())) {
            throw new Error('Invalid email');
        }
        if (this.users.find((u) => u.email === email.toLowerCase())) {
            throw new Error('Email already exists');
        }
        return true;
    }
    async checkUsername(username) {
        if (this.users.find((u) => u.username === username.toLowerCase())) {
            throw new Error('Username already exists');
        }
        return true;
    }
    async create(user) {
        const hashedPW = await this.hashPassword(user.password);
        const emailCheck = await this.checkEmail(user.email);
        const usernameCheck = await this.checkUsername(user.username);
        if (emailCheck && usernameCheck) {
            this.users.push({
                id: (0, uuid_1.v4)(),
                email: user.email.toLowerCase(),
                username: user.username.toLowerCase(),
                password: hashedPW.toString(),
            });
            return this.users.find((u) => u.email === user.email.toLowerCase());
        }
    }
    async findAll() {
        return this.users;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map