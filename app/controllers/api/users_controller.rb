class Api::UsersController < ApplicationController
  def show
  end

  def index
    @users = User.includes(:authored_posts).all
    render :index
  end
end
