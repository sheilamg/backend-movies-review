import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class Audit {
    
    @CreateDateColumn()
    created_at: Date;
  
    @DeleteDateColumn()
    deleted_at?: Date;

    
  }