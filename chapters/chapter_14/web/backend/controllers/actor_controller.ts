import express from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    response,
    requestParam,
    requestBody
} from "inversify-express-utils";
import { Repository } from "typeorm";
import { Actor } from "../entities/actor";
import { TYPE } from "../constants/types";

@controller("/api/v1/actors")
export class ActorController {

    private readonly _ActorRepository: Repository<Actor>;

    public constructor(
        @inject(TYPE.ActorRepository)ActorRepository: Repository<Actor>
    ) {
        this._ActorRepository = ActorRepository;
    }

    @httpGet("/")
    public async get(
        @response() res: express.Response
    ) {
        try {
            return await this._ActorRepository.find();
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }

    @httpGet("/:year")
    public async getByYear(
        @response() res: express.Response,
        @requestParam("year") yearParam: string
    ) {
        try {
            const yearBorn = parseInt(yearParam);
            return await this._ActorRepository.find({
                yearBorn
            });
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }

    @httpPost("/")
    public async post(
        @response() res: express.Response,
        @requestBody() newActor: Actor
    ) {
        if (
            !(typeof newActor.name === "string") || isNaN(newActor.yearBorn)
        ) {
            res.status(400);
            res.send(`Invalid Actor!`);
        }
        try {
            return await this._ActorRepository.save(newActor);
        } catch(e) {
            res.status(500);
            res.send(e.message);
        }
    }

}
