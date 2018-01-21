class UsersController < ApplicationController
    def create
        user = User.new(user_params)
        if user.save
        # do nothing, great!
        else
            render json: user.errors.full_messages, status: 422
        end
    end

    def verify
        if params[:name]
            validate_name
        elsif params[:email]
            validate_email
        end
        
        
        # checks errors
        if !(@errors.empty?)   
            render json: @errors, status: 422
        end
    end
    
    private

    def user_params
        params.require(:user).permit(:fname, :lname, :email,
        :age, :height, :weight, :favorite_color)
    end

    def validate_name
        first_name = params[:name][:fname]
        last_name = params[:name][:lname]

        user = User.new(fname: first_name, lname: last_name)
        if user.valid? == false
            fname_errors = user.errors.messages[:fname]
            lname_errors = user.errors.messages[:lname]
            @errors = []
            if !(fname_errors.empty?)
                @errors.push(fname_errors)
            elsif !(lname_errors.empty?)
                @errors.push(lname_errors)
            end
        end
    end

    def validate_email
        email = params[:email]
    end

end
