
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";
import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";



// для проверки авторизации пользователя и запрете доступа при ее отсутвии
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token = req.cookies.refreshToken; // Получение токена из кукис с именем 'token'

            if (!token) {
                throw new UnauthorizedException({ message: "Пользователь не авторизован" });
            }
            req.user = this.jwtService.verify(token, {secret: "FFFGKJKFWMV"});
            return true;
        } catch (e) {
            throw new UnauthorizedException({ message: "Пользователь не авторизован" });
        }

    }
}