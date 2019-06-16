"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let GitHubRepository = class GitHubRepository {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], GitHubRepository.prototype, "archived", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GitHubRepository.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], GitHubRepository.prototype, "disabled", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", Object)
], GitHubRepository.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], GitHubRepository.prototype, "fork", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GitHubRepository.prototype, "forks_count", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GitHubRepository.prototype, "html_url", void 0);
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], GitHubRepository.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", Object)
], GitHubRepository.prototype, "language", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GitHubRepository.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], GitHubRepository.prototype, "private", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", Object)
], GitHubRepository.prototype, "pushed_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GitHubRepository.prototype, "stargazers_count", void 0);
__decorate([
    typeorm_1.Column("varchar", { nullable: true }),
    __metadata("design:type", Object)
], GitHubRepository.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], GitHubRepository.prototype, "watchers_count", void 0);
GitHubRepository = __decorate([
    typeorm_1.Entity()
], GitHubRepository);
exports.default = GitHubRepository;
