class ApplicationController < ActionController::Base
  def show
    respond_to do |format|
      format.html
      format.json
      format.js
    end
  end
end
