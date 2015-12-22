class Api::FollowsController < ApplicationController

  def new

  end

  def index
    @follows = Follow.all.order('"created_at" DESC')
  end

  def create
    @follow = Follow.new(follow_params)

    @follow.author_id = current_user.id

    if @follow.save
      # render :create
      @follows = Follow.all

      render :index
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

    def show
      @follow = Follow.find(params[:id])
    end

    def destroy
     @follow = Follow.find(params[:id])
     @follow.destroy
     @follows = Follow.all
     render :index
    end

  private

  def follow_params
    params.require(:follow).permit(
      :followed_user_id
    )
  end


end
