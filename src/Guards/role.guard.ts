import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";


// для проверки авторизации пользователя и запрете доступа при ее отсутвии
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                //рефлектор помогает доставать данные
                private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const token = req.cookies["refreshToken"];
            const user = this.jwtService.verify(token, {secret: "FFFGKJKFWMV"});
            req.user = user;
            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            console.log(e)
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
        }
    }
}