class Api::UsersController < ApplicationController
  def show
  end

  def index
    @users = User.includes(:authored_posts, :subjectOfPosts, :leftComments).all
    render :index
  end

  def update

        @user = User.find(params[:id])

        if @user.update(user_params)
          @users = User.all
          render :index
        else
          flash.now[:errors] = @user.errors.full_messages
        end
  end

  private

  def user_params
    params.require(:user).permit(
      :profile_image, :age, :location
    )
  end
end
